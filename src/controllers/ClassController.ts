import { Request, Response } from 'express';

import CreateClassService from '../services/Classes/CreateClassService';
import ListClassService from '../services/Classes/ListClassService';
import UpdateClassService from '../services/Classes/UpdateClassService';

import ClassDTO from '../dtos/ClassDTO';

export default class ClassController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { class_day, class_hour, class_level }: ClassDTO = request.body;

    const listClassService = new ListClassService();
    const retrievedClasses = await listClassService.execute({
      class_day,
      class_hour,
      class_level,
    });

    return response.json(retrievedClasses);
  }

  public async listClassDetails(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    // const { class_day, class_hour, class_level }: ClassDTO = request.body;

    const listClassService = new ListClassService();
    const retrievedClasses = await listClassService.execute({
      class_day,
      class_hour,
      class_level,
    });

    return response.json(retrievedClasses);
  }

  public async listClassTimetable(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { class_day, class_hour, class_level }: ClassDTO = request.body;

    const listClassService = new ListClassService();
    const retrievedClasses = await listClassService.execute({
      class_day,
      class_hour,
      class_level,
    });

    return response.json(retrievedClasses);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      class_day,
      class_hour,
      class_duration,
      class_level,
      teacher_id,
      start_date,
      weeks_duration,
    }: ClassDTO = request.body;

    if (!class_day || !class_hour || !class_duration) {
      throw new Error('Invalid data provided');
    }
    const createClassService = new CreateClassService();

    const createdClass = await createClassService.execute({
      class_day,
      class_hour,
      class_duration,
      class_level,
      teacher_id,
      start_date,
      weeks_duration,
    });

    return response.json({ createdClass });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { body } = request;

    const updateClassService = new UpdateClassService();
    const updatedClass = await updateClassService.execute(id, body);

    return response.json({ updatedClass });
  }
}
