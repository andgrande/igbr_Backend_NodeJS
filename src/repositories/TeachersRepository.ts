import { EntityRepository, Repository } from 'typeorm';

import Teacher from '../models/Teacher';
import TeacherDTO from '../dtos/TeacherDTO';

@EntityRepository(Teacher)
class ClassesRepository extends Repository<Teacher> {
  public async createNewTeacher({
    teacher_name,
    teacher_email,
    password,
  }: TeacherDTO): Promise<Teacher> {
    try {
      const newTeacher = this.create({
        teacher_name,
        teacher_email,
        password,
      });

      const createdTeacher = await this.save(newTeacher);

      return createdTeacher || null;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByEmail(teacher_email: string): Promise<Teacher | null> {
    const retrievedTeacher = await this.findOne({ where: { teacher_email } });

    return retrievedTeacher || null;
  }
}

export default ClassesRepository;
