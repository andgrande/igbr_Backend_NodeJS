import { Router } from 'express';

import ClassController from './controllers/ClassController';
import ClassDetailsController from './controllers/ClassDetailsController';
import ClassTimetableController from './controllers/ClassTimetableController';
import StudentController from './controllers/StudentController';
import StudentsUpdatesController from './controllers/StudentsUpdatesController';
import TeacherController from './controllers/TeacherController';

const routes = Router();
const classController = new ClassController();
const classDetailsController = new ClassDetailsController();
const classTimetableController = new ClassTimetableController();
const studentsController = new StudentController();
const studentsUpdatesController = new StudentsUpdatesController();
const teacherController = new TeacherController();

routes.get('/classes', classController.index);
routes.post('/classes', classController.create); //
routes.patch('/classes/:id', classController.update);
routes.get('/classes/:class_id/details', classDetailsController.index);
routes.get('/classes/timetable/:hour', classTimetableController.index);

routes.get('/students', studentsController.index); //
routes.post('/students', studentsController.create); //
routes.patch('/students/:id', studentsController.updateStudentData);
routes.patch('/students/:id/set_status', studentsUpdatesController.update);
// routes.patch('/students/:id/set_class', studentsController.updateStudentClass); //

routes.get('/teacher', teacherController.index);
routes.post('/teacher', teacherController.create);

export default routes;
