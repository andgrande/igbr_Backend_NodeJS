import { EntityRepository, Repository } from 'typeorm';

import Classes_x_Students from '../models/Classes_x_Students';

interface CreateNewTimetableDTO {
  class_id: string;
  class_name: string;
  student_id: string;
  student_name: string;
  teacher_id: string;
  teacher_name: string;
}

@EntityRepository(Classes_x_Students)
class ClassesRepository extends Repository<Classes_x_Students> {
  public async createClasses_x_Students({
    class_id,
    class_name,
    student_id,
    student_name,
    teacher_id,
    teacher_name,
  }: CreateNewTimetableDTO): Promise<Classes_x_Students> {
    try {
      const newClasses_x_Students = this.create({
        class_id,
        class_name,
        student_id,
        student_name,
        teacher_id,
        teacher_name,
      });

      const createdClasses_x_Students = await this.save(newClasses_x_Students);

      return createdClasses_x_Students || null;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByEmail(email: string): Promise<Classes_x_Students[]> {
    const retrievedClasses_x_Students = await this.find({ where: { email } });

    return retrievedClasses_x_Students || null;
  }

  public async findByClassAndStudent(
    class_id: string,
    student_id: string,
  ): Promise<Classes_x_Students[]> {
    const retrievedClasses_x_Students = await this.find({
      where: { class_id, student_id },
    });

    return retrievedClasses_x_Students || null;
  }

  // create update method
}

export default ClassesRepository;
