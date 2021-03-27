import { getCustomRepository } from 'typeorm';
import { parseISO, getDayOfYear } from 'date-fns';
import ClassesTimetable from '../../models/ClassesTimetable';

import StudentRepository from '../../repositories/StudentsRepository';
import ClassesRepository from '../../repositories/ClassesRepository';
import ClassesTimetableRepository from '../../repositories/ClassesTimetableRepository';
import Classes_x_StudentsRepository from '../../repositories/Classes_x_StudentsRepository';

import { UpdateTimetableDTO } from '../../dtos/ClassTimetableDTO';

class UpdateStudentPresenceAndHomeworkService {
  public async execute(
    id: string,
    { class_id, student_presence, student_homework, date }: UpdateTimetableDTO,
  ): Promise<ClassesTimetable[]> {
    try {
      const studentRepository = getCustomRepository(StudentRepository);
      const classRepository = getCustomRepository(ClassesRepository);
      const classesTimetableRepository = getCustomRepository(
        ClassesTimetableRepository,
      );
      const classes_x_StudentsRepository = getCustomRepository(
        Classes_x_StudentsRepository,
      );

      const studentRegister = await studentRepository.findOne({ id });
      const isClassExistent = await classRepository.getClassById(class_id);
      const validInput = await classes_x_StudentsRepository.findByClassAndStudent(
        class_id,
        id,
      );

      if (!validInput.length) {
        throw new Error('Invalid input');
      }

      if (!isClassExistent || !studentRegister) {
        throw new Error(
          `${!isClassExistent ? 'Class' : 'Student'} ${'not found!'}`,
        );
      }

      const formattedDate = parseISO(date);

      // NEED TO FIX TIMEZONE HERE

      const classTimetable = await classesTimetableRepository.getTimetableByClassId(
        class_id,
      );

      let isDateRegistered = false;
      const updatedClassTimetable = classTimetable.map(timetable => {
        const updatedStatus = {
          ...timetable.students_presence,
        };

        if (getDayOfYear(formattedDate) === getDayOfYear(timetable.date)) {
          isDateRegistered = true;
          const studentIdStrig = studentRegister.id.toString();

          Object.keys(updatedStatus).forEach(key => {
            if (key === studentIdStrig) {
              if (typeof student_presence === 'boolean') {
                Object.defineProperty(updatedStatus[key], 'present', {
                  value: student_presence,
                });
              }

              if (typeof student_homework === 'boolean') {
                Object.defineProperty(updatedStatus[key], 'homework', {
                  value: student_homework,
                });
              }
            }
          });
        }

        const updatedTimetable = {
          ...timetable,
          students_presence: updatedStatus,
        };

        return updatedTimetable;
      });

      if (!isDateRegistered) {
        throw new Error(
          'Provided date is not registered for this class / student',
        );
      }

      await classesTimetableRepository.updateTimetable(updatedClassTimetable);

      return updatedClassTimetable || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default UpdateStudentPresenceAndHomeworkService;
