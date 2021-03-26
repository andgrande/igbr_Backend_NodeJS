import { Request, Response } from 'express';

interface Test {
  id: number;
  name: string;
  hour: string;
  students: Array<{
    id: string;
    name: string;
  }>;
}

const classArray: Test[] = [
  {
    id: 1,
    name: 'A1',
    hour: '19h',
    students: [
      { id: 'aab', name: 'Handers' },
      { id: 'abc', name: 'Mirlas' },
    ],
  },
  {
    id: 2,
    name: 'A2',
    hour: '20h',
    students: [
      { id: 'aab', name: 'Handers' },
      { id: 'abc', name: 'Mirlas' },
    ],
  },
  {
    id: 3,
    name: 'B1',
    hour: '21h',
    students: [
      { id: 'aab', name: 'Handers' },
      { id: 'abc', name: 'Mirlas' },
    ],
  },
  {
    id: 4,
    name: 'B2',
    hour: '18h',
    students: [
      { id: 'aab', name: 'Handers' },
      { id: 'abc', name: 'Mirlas' },
    ],
  },
  {
    id: 5,
    name: 'C1',
    hour: '17h',
    students: [
      { id: 'aab', name: 'Handers' },
      { id: 'abc', name: 'Mirlas' },
    ],
  },
];

export default class ClassTimetableController {
  public index(request: Request, response: Response): Response {
    const { hour } = request.params;

    const mappedClasses = classArray.filter(item => item.hour === hour);

    return response.json(mappedClasses);
  }
}
