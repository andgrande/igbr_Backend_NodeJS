import { getCustomRepository, getRepository } from 'typeorm';
import Student from '../../models/Student';
import Class from '../../models/Class';
import Classes_x_Students from '../../models/Classes_x_Students';
import ClassesTimetable from '../../repositories/ClassesTimetableRepository';

import formatName from '../../utils/formatName';

import { StudentDTO } from '../../dtos/StudentDTO';

class UpdateStudentClassService {
  public async execute(
    id: string,
    {
      class_id,
      first_name,
      last_name,
      CEP,
      CPF,
      address,
    }: Omit<StudentDTO, 'email'>,
  ): Promise<Student> {
    try {
      const studentRepository = getRepository(Student);
      const classRepository = getRepository(Class);
      const classesStudents = getRepository(Classes_x_Students);
      const classesTimetableRepository = getCustomRepository(ClassesTimetable);

      const studentRegister = await studentRepository.findOne({ id });

      if (!studentRegister) {
        throw new Error(`Invalid 'Student ID' Please provide valid data`);
      }

      let retrievedClass;
      if (class_id) {
        retrievedClass = await classRepository.findOne({
          where: { id: class_id },
        });

        if (!retrievedClass) {
          throw new Error('Invalid Class ID');
        }

        const retrievedClassStudentRelation = await classesStudents.findOne({
          where: {
            class_id: studentRegister.class_id,
            student_id: studentRegister.id,
          },
        });

        if (retrievedClassStudentRelation) {
          await classesStudents.delete({
            id: retrievedClassStudentRelation.id,
          });
        }

        const newClassStudentRelation = classesStudents.create({
          teacher_id: retrievedClass.teacher_id,
          teacher_name: retrievedClass.teacher.teacher_name,
          class_name: retrievedClass.class_id,
          class_id: retrievedClass.id,
          student_id: studentRegister.id,
          student_name: studentRegister.full_name,
        });

        await classesStudents.save(newClassStudentRelation);

        const oldClassTimetable = await classesTimetableRepository.getTimetableByClassId(
          studentRegister.class_id,
        );

        const oldClassUpdatedTimetable = oldClassTimetable.map(timetable => {
          const updatedStatus = {
            ...timetable.students_presence,
          };

          const studentIdStrig = studentRegister.id.toString();

          Object.keys(updatedStatus).forEach(key => {
            if (key === studentIdStrig) {
              Object.defineProperty(updatedStatus[key], 'status', {
                value: 'inactive',
              });
            }
          });

          const newTimetable = {
            ...timetable,
            students_presence: updatedStatus,
          };

          return newTimetable;
        });

        await classesTimetableRepository.updateTimetable(
          oldClassUpdatedTimetable,
        );

        const newClassTimetable = await classesTimetableRepository.getTimetableByClassId(
          newClassStudentRelation.class_id,
        );

        const newClassUpdatedTimetable = newClassTimetable.map(timetable => {
          const updatedPresence = {
            ...timetable.students_presence,
            [studentRegister.id]: {
              name: studentRegister.full_name,
              present: false,
              homework: true,
              status: 'active',
            },
          };
          const newTimetable = {
            ...timetable,
            students_presence: updatedPresence,
          };

          return newTimetable;
        });

        await classesTimetableRepository.updateTimetable(
          newClassUpdatedTimetable,
        );
      }

      const formattedFirstName = first_name
        ? formatName(first_name)
        : studentRegister.first_name;
      const formattedLastName = last_name
        ? formatName(last_name)
        : studentRegister.last_name;

      studentRegister.first_name = formattedFirstName;
      studentRegister.last_name = formattedLastName;
      studentRegister.full_name = `${formattedFirstName} ${formattedLastName}`;
      studentRegister.class_id = class_id || studentRegister.class_id;
      studentRegister.CPF = CPF || studentRegister.CPF;
      studentRegister.CPF = CEP || studentRegister.CEP;
      studentRegister.address = address || studentRegister.address;

      await studentRepository.save(studentRegister);

      return studentRegister || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default UpdateStudentClassService;
