import { Request, Response } from 'express';

interface Test {
  id: number;
  name: string;
}

const studentsArray: Test[] = [
  { id: 1, name: 'Son' },
  { id: 2, name: 'Jhin' },
  { id: 3, name: 'Ron' },
  { id: 4, name: 'Lee' },
  { id: 5, name: 'Bron' },
];

export default class StudentsUpdatesController {
  public update(request: Request, response: Response): Response {
    // set Presence
    // set homework_status
    console.log(request.params);

    return response.status(200);
  }
}
