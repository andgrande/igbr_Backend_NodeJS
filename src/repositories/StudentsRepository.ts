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
      });

      const createdStudent = await this.save(newStudent);

      return createdStudent || null;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByEmail(email: string): Promise<Student[]> {
    const retrievedStudent = await this.find({ where: { email } });

    return retrievedStudent || null;
  }
}

export default ClassesRepository;
