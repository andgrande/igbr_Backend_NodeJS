import { getRepository, ILike } from 'typeorm';
import Student from '../../models/Student';

import { StudentNameDTO } from '../../dtos/StudentDTO';

class ListStudentsService {
  public async execute({ name }: StudentNameDTO): Promise<Student[]> {
    try {
      const studentRepository = getRepository(Student);

      let studentList;

      if (name) {
        studentList = await studentRepository.find({
          where: {
            full_name: ILike(`%${name}%`),
          },
        });
      } else {
        studentList = await studentRepository.find();
      }

      return studentList || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ListStudentsService;
