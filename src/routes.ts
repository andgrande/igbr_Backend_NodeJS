import { Router } from 'express';

import ClassController from './controllers/ClassController';
import StudentController from './controllers/StudentController';
import TeacherController from './controllers/TeacherController';

const routes = Router();

const classController = new ClassController();
const studentsController = new StudentController();
const teacherController = new TeacherController();

routes.get('/classes', classController.index);
routes.post('/classes', classController.create); //
routes.patch('/classes/:id/set_status', classController.updateTimetableStatus);
routes.get('/classes/:id/details', classController.listClassDetails);
routes.get('/classes/timetable/', classController.listClassTimetable);

routes.get('/students', studentsController.index); //
routes.get('/students/sessions', studentsController.authenticateStudent);
routes.post('/students', studentsController.create); //
routes.patch('/students/:id', studentsController.updateStudentData);
routes.patch(
  '/students/:id/set_status',
  studentsController.updateStudentActivities,
);

routes.get('/teacher', teacherController.index);
routes.post('/teacher/sessions', teacherController.authenticateTeacher);
routes.post('/teacher', teacherController.create);

export default routes;
