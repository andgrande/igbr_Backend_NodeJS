import { getCustomRepository } from 'typeorm';

import Class from '../../models/Class';
import ClassesTimetable from '../../models/ClassesTimetable';
import ClassRepository from '../../repositories/ClassesRepository';
import ClassesTimetableRepository from '../../repositories/ClassesTimetableRepository';

interface IResponse {
  retrievedClasses: Class;
  retrievedTimetable: ClassesTimetable[];
}

class ListClassDetailsService {
  public async execute(id: string): Promise<IResponse> {
    try {
      const classRepository = getCustomRepository(ClassRepository);
      const timetableRepository = getCustomRepository(
        ClassesTimetableRepository,
      );

      const retrievedClasses = await classRepository.getClassDetailsById(id);
      const retrievedTimetable = await timetableRepository.getTimetableByClassId(
        id,
      );

      if (!retrievedClasses) {
        throw new Error('Invalid Class Id');
      }

      return { retrievedClasses, retrievedTimetable };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ListClassDetailsService;
