import { EntityRepository, Repository } from 'typeorm';

import ClassesTimetable from '../models/ClassesTimetable';

import addWeeksToClasses from '../utils/addWeeksToClasses';

interface CreateNewTimetableDTO {
  class_id: string;
  class_status: string;
  // students_presence?: Record<string, unknown>;
  students_presence?: {
    id: string;
    name: string;
    present: boolean;
    homework: boolean;
  };
  weeks_duration: number;
  start_date: Date;
}

interface IUpdateClassStatusDTO {
  class_id: string;
  date?: Date;
  new_status: 'given' | 'pending';
}

@EntityRepository(ClassesTimetable)
class ClassesRepository extends Repository<ClassesTimetable> {
  public async createNewClassTimetable({
    class_id,
    class_status,
    // date,
    weeks_duration,
    start_date,
  }: CreateNewTimetableDTO): Promise<ClassesTimetable[]> {
    try {
      const timetablesForInsertion = [];

      for (let index = 0; index < weeks_duration; index += 1) {
        const incrementedWeek = addWeeksToClasses(start_date, index);

        timetablesForInsertion.push({
          class_id,
          class_status,
          date: incrementedWeek,
          class_number: index + 1,
        });
      }

      const newClassTimetable = this.create(timetablesForInsertion);

      const createdClassTimetable = await this.save(newClassTimetable);

      return createdClassTimetable || null;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getTimetableByClassId(
    class_id: string,
  ): Promise<ClassesTimetable[]> {
    const retrievedTimetable = await this.find({ where: { class_id } });

    return retrievedTimetable || null;
  }

  public async updateTimetable(
    classTimetable: ClassesTimetable[],
  ): Promise<void> {
    await this.save(classTimetable);
  }

  public async updateTimetableClassStatus({
    class_id,
    new_status,
  }: IUpdateClassStatusDTO): Promise<ClassesTimetable> {
    const updatedTimetable = await this.findOne({
      where: {
        class_id,
      },
    });

    if (!updatedTimetable) {
      throw new Error('Error while updating status');
    }
    updatedTimetable.class_status = new_status;

    await this.save(updatedTimetable);

    return updatedTimetable;
  }
}

export default ClassesRepository;
