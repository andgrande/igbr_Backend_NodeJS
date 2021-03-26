import { Request, Response } from 'express';

import CreateStudentService from '../services/Students/CreateStudentService';
import ListStudentService from '../services/Students/ListStudentsService';
import UpdateStudentClassService from '../services/Students/UpdateStudentClassService';
import { StudentDTO, StudentNameDTO } from '../dtos/StudentDTO';

export default class StudentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name }: StudentNameDTO = request.query;
    const listStudentService = new ListStudentService();
    const studentsList = await listStudentService.execute({ name });

    return response.json(studentsList);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      email,
      class_id,
      CPF,
      CEP,
      address,
    }: StudentDTO = request.body;

    if (!email || !email.includes('@' && '.')) {
      throw new Error('Please provide valid email address');
    }
    const createStudentService = new CreateStudentService();

    const newStudent = await createStudentService.execute({
      first_name,
      last_name,
      email,
      class_id,
      CPF,
      CEP,
      address,
    });

    return response.json(newStudent);
  }

  public async updateStudentData(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { class_id, first_name, last_name, CEP, CPF, address } = request.body;

    if (!class_id && !first_name && !last_name && !CEP && !CPF && !address) {
      throw new Error('Please provide inform data to be changed');
    }

    const updateStudentClassService = new UpdateStudentClassService();
    const updatedStudent = await updateStudentClassService.execute(id, {
      class_id,
      first_name,
      last_name,
      CEP,
      CPF,
      address,
    });

    return response.json(updatedStudent);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const { class_id } = request.body;

  //   const updateStudentClassService = new UpdateStudentClassService();
  //   const updatedStudent = await updateStudentClassService.execute(id, {
  //     class_id,
  //   });

  //   return response.json(updatedStudent);
  // }
}
