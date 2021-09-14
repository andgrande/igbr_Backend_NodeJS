import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import Teacher from '../../models/Teacher';
import TeacherRepository from '../../repositories/TeachersRepository';

import TeacherDTO from '../../dtos/TeacherDTO';

class CreateTeacherService {
  public async execute({
    teacher_name,
    teacher_email,
    password,
  }: TeacherDTO): Promise<Teacher> {
    try {
      const teacherRepository = getCustomRepository(TeacherRepository);

      const isTeacherExistent = await teacherRepository.findByEmail(
        teacher_email,
      );

      if (isTeacherExistent) {
        throw new Error('Teacher already existent');
      }

      const hashedPass = await hash(password, 8);

      const newTeacher = await teacherRepository.createNewTeacher({
        teacher_name,
        teacher_email,
        password: hashedPass,
      });

      return newTeacher || null;
    } catch (err) {
      return err;
    }
  }
}

export default CreateTeacherService;
