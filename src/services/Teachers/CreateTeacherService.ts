import { getRepository } from 'typeorm';
import Teacher from '../../models/Teacher';

import TeacherDTO from '../../dtos/TeacherDTO';

class CreateTeacherService {
  public async execute({
    teacher_name,
    teacher_email,
  }: TeacherDTO): Promise<Teacher> {
    try {
      const teacherRepository = getRepository(Teacher);

      const isTeacherExistent = await teacherRepository.find({
        where: { teacher_email },
      });

      if (isTeacherExistent.length) {
        throw new Error('Teacher already existent');
      }

      const newTeacher = teacherRepository.create({
        teacher_name,
        teacher_email,
      });

      await teacherRepository.save(newTeacher);

      return newTeacher || null;
    } catch (err) {
      return err;
    }
  }
}

export default CreateTeacherService;
