import { EntityRepository, Repository } from 'typeorm';

import Student from '../models/Student';

interface CreateNewTimetableDTO {
  class_id?: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  CPF?: string;
  CEP?: string;
  address?: string;
  password: string;
}

@EntityRepository(Student)
class ClassesRepository extends Repository<Student> {
  public async createNewStudent({
    first_name,
    last_name,
    full_name,
    email,
    class_id,
    CPF,
    CEP,
    address,
    password,
  }: CreateNewTimetableDTO): Promise<Student> {
    try {
      const newStudent = this.create({
        first_name,
        last_name,
        full_name,
        email,
        class_id,
        CPF,
        CEP,
        address,
        password,
      });

      const createdStudent = await this.save(newStudent);

      return createdStudent || null;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByEmail(email: string): Promise<Student | null> {
    const retrievedStudent = await this.findOne({ where: { email } });

    return retrievedStudent || null;
  }
}

export default ClassesRepository;
