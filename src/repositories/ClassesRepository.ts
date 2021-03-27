import { EntityRepository, Repository } from 'typeorm';

import Class from '../models/Class';

import ClassDTO from '../dtos/ClassDTO';

interface GetSingleClassDTO {
  class_day: string;
  class_hour: number;
  class_level: string;
}

@EntityRepository(Class)
class ClassesRepository extends Repository<Class> {
  public async getClassById(id: string): Promise<Class | null> {
    const retrievedClass = await this.findOne({ id });

    return retrievedClass || null;
  }

  public async getClassDetailsById(id: string): Promise<Class | null> {
    const retrievedClass = await this.findOne(id, {
      relations: ['classes_x_students'],
    });

    return retrievedClass || null;
  }

  public async getUniqueClass({
    class_day,
    class_hour,
    class_level,
  }: GetSingleClassDTO): Promise<Class | null> {
    const retrievedClass = await this.findOne({
      where: { class_day, class_hour, class_level },
    });

    return retrievedClass || null;
  }

  public async createNewClass({
    class_id,
    class_day,
    class_duration,
    class_hour,
    class_level,
    teacher_id,
    start_date,
    weeks_duration,
  }: ClassDTO): Promise<Class> {
    const newClass = this.create({
      class_id,
      class_day,
      class_duration,
      class_hour,
      class_level,
      teacher_id,
      start_date,
      weeks_duration,
    });

    const createdClass = await this.save(newClass);

    return createdClass;
  }
}

export default ClassesRepository;
