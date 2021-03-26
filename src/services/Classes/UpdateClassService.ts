import { getRepository } from 'typeorm';
import Class from '../../models/Class';

import ClassDTO from '../../dtos/ClassDTO';
import generateClassCode from '../../utils/generateClassCode';

class UpdateClassService {
  public async execute(
    id: string,
    {
      class_day,
      class_duration,
      class_hour,
      class_level,
      teacher_id,
    }: ClassDTO,
  ): Promise<Class> {
    const classRepository = getRepository(Class);
    const retrievedClass = await classRepository.findOne(id);

    if (!retrievedClass) {
      throw new Error('Invalid Class');
    }

    if (
      !class_day &&
      !class_duration &&
      !class_hour &&
      !class_level &&
      !teacher_id
    ) {
      throw new Error('Required to fill at least one info');
    }

    const classToUpdate = {
      id,
      class_id:
        class_day || class_hour || class_level
          ? generateClassCode({
              class_day,
              class_hour,
              class_level,
            })
          : retrievedClass.class_id,
      class_level: class_level || retrievedClass.class_level,
      class_day: class_day || retrievedClass.class_day,
      class_duration: class_duration || retrievedClass.class_duration,
      class_hour: class_hour || retrievedClass.class_hour,
      teacher_id: teacher_id || retrievedClass.teacher_id,
    };

    const updatedClass = await classRepository.save(classToUpdate);

    return updatedClass || null;
  }
}

export default UpdateClassService;
