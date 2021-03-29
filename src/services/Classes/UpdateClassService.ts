import { parseISO, getDayOfYear } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import ClassTimetable from '../../models/ClassesTimetable';

import ClassesRepository from '../../repositories/ClassesRepository';
import ClassesTimetableRepository from '../../repositories/ClassesTimetableRepository';

interface IRequestDTO {
  date: string;
  new_status: 'given' | 'pending';
}

class UpdateClassService {
  public async execute(
    id: string,
    { date, new_status }: IRequestDTO,
  ): Promise<ClassTimetable[]> {
    const classRepository = getCustomRepository(ClassesRepository);
    const classesTimetableRepository = getCustomRepository(
      ClassesTimetableRepository,
    );
    const retrievedClass = await classRepository.getClassById(id);

    if (!retrievedClass) {
      throw new Error('Invalid Class');
    }

    if (!date && !new_status) {
      throw new Error('Required to fill at least one info');
    }

    const formattedDate = parseISO(date);

    // const timetable = await classesTimetableRepository.updateTimetableClassStatus(
    //   { class_id: id, date: formattedDate, new_status },
    // );

    const timetable = await classesTimetableRepository.getTimetableByClassId(
      id,
    );

    const updatedTimetable = timetable.filter(item => {
      if (getDayOfYear(item.date) === getDayOfYear(formattedDate)) {
        // Object.assign(item.class_status, new_status);
        Object.defineProperty(item, 'class_status', {
          value: new_status,
        });
      }
      return item;
    });

    await classesTimetableRepository.updateTimetable(updatedTimetable);

    // ================================
    // const classToUpdate = {
    //   id,
    //   class_id:
    //     class_day || class_hour || class_level
    //       ? generateClassCode({
    //           class_day,
    //           class_hour,
    //           class_level,
    //         })
    //       : retrievedClass.class_id,
    //   class_level: class_level || retrievedClass.class_level,
    //   class_day: class_day || retrievedClass.class_day,
    //   class_duration: class_duration || retrievedClass.class_duration,
    //   class_hour: class_hour || retrievedClass.class_hour,
    //   teacher_id: teacher_id || retrievedClass.teacher_id,
    // };

    return updatedTimetable;
  }
}

export default UpdateClassService;
