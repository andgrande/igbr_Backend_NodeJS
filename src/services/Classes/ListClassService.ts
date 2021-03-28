import { getRepository, ILike } from 'typeorm';
import ClassDTO from '../../dtos/ClassDTO';

import Class from '../../models/Class';

class ListClassService {
  public async execute({
    class_day,
    class_level,
    class_hour,
  }: Omit<ClassDTO, 'teacher_id' | 'start_date' | 'weeks_duration'>): Promise<
    Class[]
  > {
    try {
      const classRepository = getRepository(Class);

      let retrievedClasses;
      if (!class_day && !class_level && !class_hour) {
        retrievedClasses = await classRepository.find();
      } else if (!class_hour) {
        retrievedClasses = await classRepository.find({
          where: [
            {
              class_day: ILike(`%${class_day}%`),
              class_level: ILike(`%${class_level}%`),
              // teacher_id: ILike(`%${teacher_id}%`),
            },
          ],
        });
      } else {
        retrievedClasses = await classRepository.find({
          where: [
            {
              class_hour,
              class_day: ILike(`%${class_day}%`),
              class_level: ILike(`%${class_level}%`),
              // teacher_id: ILike(`%${teacher_id}%`),
            },
          ],
        });
      }

      return retrievedClasses || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ListClassService;
