import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import StudentRepository from '../../repositories/StudentsRepository';
import ClassesRepository from '../../repositories/ClassesRepository';
import ClassesTimetableRepository from '../../repositories/ClassesTimetableRepository';

import Student from '../../models/Student';
import Classes_x_Students from '../../repositories/Classes_x_StudentsRepository';

import formatName from '../../utils/formatName';

import { StudentDTO } from '../../dtos/StudentDTO';

class CreateStudentsService {
  public async execute({
    first_name,
    last_name,
    email,
    class_id,
    CPF,
    CEP,
    address,
    password,
  }: StudentDTO): Promise<Student> {
    try {
      const studentRepository = getCustomRepository(StudentRepository);
      const classRepository = getCustomRepository(ClassesRepository);
      const classesXStudentsRepository = getCustomRepository(
        Classes_x_Students,
      );
      const classesTimetableRepository = getCustomRepository(
        ClassesTimetableRepository,
      );

      const isEmailExistent = await studentRepository.findByEmail(email);

      if (isEmailExistent) {
        throw new Error('Email already existent');
      }

      let classes;
      if (class_id && class_id.length) {
        classes = await classRepository.getClassById(class_id);
      }

      if (!classes) {
        throw new Error('Invalid Class ID');
      }

      const formattedFirstName = formatName(first_name);
      const formattedLastName = formatName(last_name);

      const hashedPass = await hash(password, 8);
      const newStudent = await studentRepository.createNewStudent({
        first_name: formattedFirstName,
        last_name: formattedLastName,
        full_name: `${formattedFirstName} ${formattedLastName}`,
        email,
        class_id,
        CPF,
        CEP,
        address,
        password: hashedPass,
      });

      await classesXStudentsRepository.createClasses_x_Students({
        class_id: newStudent.class_id,
        class_name: classes.class_id,
        student_id: newStudent.id,
        student_name: newStudent.full_name,
        teacher_id: classes.teacher_id,
        teacher_name: classes.teacher.teacher_name,
      });

      const classesTimetable = await classesTimetableRepository.getTimetableByClassId(
        newStudent.class_id,
      );

      const updatedTimetable = classesTimetable.map(timetable => {
        const updatedPresence = {
          ...timetable.students_presence,
          [newStudent.id]: {
            name: newStudent.full_name,
            present: null,
            homework: null,
            status: 'active',
          },
        };
        const newTimetable = {
          ...timetable,
          students_presence: updatedPresence,
        };

        return newTimetable;
      });

      await classesTimetableRepository.updateTimetable(updatedTimetable);

      return newStudent || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CreateStudentsService;
