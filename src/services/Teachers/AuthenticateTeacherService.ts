import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../config/auth';

import Teacher from '../../models/Teacher';
import TeacherRepository from '../../repositories/TeachersRepository';

interface IRequest {
  teacher_email: string;
  password: string;
}

interface IResponse {
  teacher: Teacher;
  token: string;
}

class AuthenticateTeacherService {
  public async execute({
    teacher_email,
    password,
  }: IRequest): Promise<IResponse | null> {
    const teachersRepository = getCustomRepository(TeacherRepository);
    const teacher = await teachersRepository.findByEmail(teacher_email);

    if (!teacher) {
      // throw new Error('Invalid Email/Password!');
      return null;
    }

    const isPasswordValid = await compare(password, teacher.password);

    if (!isPasswordValid) {
      // throw new Error('Invalid Email/Password!');
      return null;
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: teacher.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { teacher, token };
  }
}

export default AuthenticateTeacherService;
