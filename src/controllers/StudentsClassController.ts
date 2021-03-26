import { Request, Response } from 'express';

export default class StudentsClassController {
  public update(request: Request, response: Response): Response {
    // set Class

    console.log(request.params);

    return response.status(200);
  }
}
