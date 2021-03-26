import { Request, Response } from 'express';

interface Test {
  id: number;
  name: string;
}

const classArray: Test[] = [
  { id: 1, name: 'A1' },
  { id: 2, name: 'A2' },
  { id: 3, name: 'B1' },
  { id: 4, name: 'B2' },
  { id: 5, name: 'C1' },
];

export default class ClassDetailsController {
  public index(request: Request, response: Response): Response {
    const { params } = request;
    const id = Number(params.class_id);

    const mappedClasses = classArray.filter(
      item => item.id === id && item.name,
    );

    if (!mappedClasses.length) {
      throw new Error('Inexistent ID');
    }

    return response.json(mappedClasses);
  }
}
