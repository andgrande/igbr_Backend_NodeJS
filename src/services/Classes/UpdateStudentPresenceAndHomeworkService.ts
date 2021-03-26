import { getCustomRepository } from 'typeorm';
import { parseISO, startOfHour } from 'date-fns';
import ClassesTimetable from '../../models/ClassesTimetable';

import ClassesRepository from '../../repositories/ClassesRepository';
import ClassesTimetableRepository from '../../repositories/ClassesTimetableRepository';

import ClassTimetableDTO from '../../dtos/ClassTimetableDTO';

class CreateClassService {
  public async execute({
    class_id,
    class_status,
    students_presence,
    date,
  }: ClassTimetableDTO): Promise<ClassesTimetable[]> {
    try {
      const classRepository = getCustomRepository(ClassesRepository);
      const classesTimetable = getCustomRepository(ClassesTimetableRepository);

      const isClassExistent = await classRepository.getClassById(class_id);

      if (isClassExistent) {
        throw new Error('Class already existent');
      }

      const date1 = new Date();

      const students: Record<string, unknown> = {
        students: [
          {
            name: 'John',
            present: true,
            homework: true,
          },
          {
            name: 'Marri',
            present: true,
            homework: false,
          },
          {
            name: 'Joly',
            present: false,
            homework: true,
          },
        ],
      };

      const ttt = await classesTimetable.getTimetableByClassId(class_id);

      console.log(ttt);

      // "date": "2021-03-05 15:00:00"
      // parseIso
      // startOfHour

      // const tt = { ...timetable.students_presence };

      // timetable.students_presence = {
      //   id: 'x',
      //   name: 'xon',
      //   age: 123,
      // };
      // console.log(tt);

      // if (tt.id === newStudent.id) {
      //   Object.keys(tt).forEach(key => {
      //     console.log(key);
      //     if (tt[key] !== 'x') {
      //       // console.log((tt.name = 'bla'));
      //     }
      //   });
      // }

      return ttt || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CreateClassService;
