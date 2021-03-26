import { getRepository, ILike } from 'typeorm';
import Teacher from '../../models/Teacher';

import TeacherDTO from '../../dtos/TeacherDTO';

class CreateTeacherService {
  public async execute({
    teacher_name,
    teacher_email,
  }: TeacherDTO): Promise<Teacher[]> {
    try {
      const teacherRepository = getRepository(Teacher);

      let retrievedTeachers;
      if (!teacher_name && !teacher_email) {
        retrievedTeachers = await teacherRepository.find();
      } else if (teacher_email) {
        retrievedTeachers = await teacherRepository.find({
          where: { teacher_email },
        });
      } else {
        retrievedTeachers = await teacherRepository.find({
          where: { teacher_name: ILike(`&${teacher_name}%`) },
        });
      }

      return retrievedTeachers || null;
    } catch (err) {
      return err;
    }
  }
}

export default CreateTeacherService;
