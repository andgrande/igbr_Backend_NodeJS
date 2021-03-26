import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import Class from '../../models/Class';

import ClassesRepository from '../../repositories/ClassesRepository';
import ClassesTimetableRepository from '../../repositories/ClassesTimetableRepository';

import ClassDTO from '../../dtos/ClassDTO';

import generateClassCode from '../../utils/generateClassCode';

class CreateClassService {
  public async execute({
    class_day,
    class_duration,
    class_hour,
    class_level,
    teacher_id,
    start_date,
    weeks_duration,
  }: ClassDTO): Promise<Class> {
    try {
      const classRepository = getCustomRepository(ClassesRepository);
      const classesTimetable = getCustomRepository(ClassesTimetableRepository);

      const isClassExistent = await classRepository.getUniqueClass({
        class_day,
        class_hour,
        class_level,
      });

      if (isClassExistent) {
        throw new Error('Class already existent');
      }

      const class_id = generateClassCode({
        class_day,
        class_hour,
        class_level,
      });

      const formattedDate = parseISO(start_date);
      formattedDate.setHours(class_hour);

      const newClass = await classRepository.createNewClass({
        class_id,
        class_day,
        class_duration,
        class_hour,
        class_level,
        teacher_id,
        start_date,
        weeks_duration,
      });

      if (!newClass) {
        throw new Error('Failed to create new class');
      }

      await classesTimetable.createNewClassTimetable({
        class_id: newClass.id,
        class_status: 'pending',
        weeks_duration,
        start_date: formattedDate,
      });

      return newClass || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CreateClassService;
