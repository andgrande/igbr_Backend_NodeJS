import { Request, Response } from 'express';

import CreateStudentService from '../services/Students/CreateStudentService';
import ListStudentService from '../services/Students/ListStudentsService';
import UpdateStudentClassService from '../services/Students/UpdateStudentClassService';
import UpdateStudentPresenceAndHomeworkService from '../services/Students/UpdateStudentPresenceAndHomeworkService';
import AuthenticateStudentService from '../services/Students/AuthenticateStudentService';
import { StudentDTO, StudentNameDTO } from '../dtos/StudentDTO';

export default class StudentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name }: StudentNameDTO = request.query;
    const listStudentService = new ListStudentService();
    const studentsList = await listStudentService.execute({ name });

    return response.json(studentsList);
  }

  public async authenticateStudent(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password }: StudentDTO = request.body;

    const authenticateTeacherService = new AuthenticateStudentService();
    const retrievedteacher = await authenticateTeacherService.execute({
      email,
      password,
    });
    return response.json(retrievedteacher);
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
      password,
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
      password,
    });

    return response.json(newStudent);
  }

  public async updateStudentData(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const {
      class_id,
      first_name,
      last_name,
      CEP,
      CPF,
      address,
      password,
    } = request.body;

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
      password,
    });

    return response.json(updatedStudent);
  }

  public async updateStudentActivities(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { class_id, student_presence, student_homework, date } = request.body;

    const updateStudentPresenceAndHomeworkService = new UpdateStudentPresenceAndHomeworkService();
    const updatedStudent = await updateStudentPresenceAndHomeworkService.execute(
      id,
      {
        class_id,
        student_presence,
        student_homework,
        date,
      },
    );

    return response.json(updatedStudent);
  }
}
