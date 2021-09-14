import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import authConfig from '../../config/auth';

import Student from '../../models/Student';
import StudentRepository from '../../repositories/StudentsRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  student: Student;
  token: string;
}

class AuthenticateStudentService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const studentsRepository = getCustomRepository(StudentRepository);
    const student = await studentsRepository.findByEmail(email);

    if (!student) {
      throw new Error('Invalid Email/Password!');
    }

    const isPasswordValid = await compare(password, student.password);

    if (!isPasswordValid) {
      throw new Error('Invalid Email/Password!');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: student.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { student, token };
  }
}

export default AuthenticateStudentService;
