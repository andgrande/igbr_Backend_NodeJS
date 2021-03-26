import { Request, Response } from 'express';

import CreateTeacherService from '../services/Teachers/CreateTeacherService';
import ListTeacherService from '../services/Teachers/ListTeacherService';

import TeacherDTO from '../dtos/TeacherDTO';

export default class TeacherController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { teacher_name, teacher_email }: TeacherDTO = request.body;

    const listTeacherService = new ListTeacherService();
    const retrievedteacheres = await listTeacherService.execute({
      teacher_name,
      teacher_email,
    });

    return response.json(retrievedteacheres);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { teacher_name, teacher_email }: TeacherDTO = request.body;

    if (!teacher_name || !teacher_email) {
      throw new Error('Invalid data provided');
    }
    const createteacherService = new CreateTeacherService();

    const createdTeacher = await createteacherService.execute({
      teacher_name,
      teacher_email,
    });

    return response.json({ createdTeacher });
  }
}
