import { getCustomRepository } from 'typeorm';

import Class from '../../models/Class';
import ClassRepository from '../../repositories/ClassesRepository';

class ListClassDetailsService {
  public async execute(id: string): Promise<Class> {
    try {
      const classRepository = getCustomRepository(ClassRepository);

      const retrievedClasses = await classRepository.getClassDetailsById(id);

      if (!retrievedClasses) {
        throw new Error('Invalid Class Id');
      }

      return retrievedClasses || null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ListClassDetailsService;
