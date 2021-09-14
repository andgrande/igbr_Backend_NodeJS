# igbr backend (Node.js)

Project under development

## Languages

- Node.js with Typescript

## Concepts and technologies applied in this project:

- Relational DB (Postgres)
- Docker containers
- SOLID principles
- ORM with typeorm
- REST API
- User authentication middleware and requests Data validation to secure APIs
- Password encryption

## Main features

Some features need to be enhanced

- [x] Create Class
  - [x] Relation with table "Teachers"
- [x] Update Class
  - [x] class_id automatically generated
- [x] Update classes
  - [x] Add student
  - [x] Enable Class status change on timetable
    - [x] PATCH /students/:id

- [x] Student
  - [ ] GET /students
    - [x] Filter by name
    - [ ] Filter by class
    - [ ] Filter by teacher
  - [x] POST /student
  - [x] PATCH /student/:id/class

- [x]  Listar classes and timetable
  - [x] GET /classes - listar todas turmas com horários e alunos - filtros em dia, hora, teacher, level
    - [x] Filter by day
    - [x] Filter by hour
    - [x] Filter by level
    - [ ] Filter by teacher
  - [x] GET /classes/:id/details
    - [x] deve listar turma específica
    - [x] deve listar timetable como horários
    - [x] deve conter informações de status, homework e presença [daqui será possível alterar no frontend]

- [x] Relations tabela timetable
- [x] Save object in timetable
- [x] Ao criar entrada na table classes, gerar entrada na classes_timetable para cada aula
- [x] Ao criar entrada na table classes, gerar entrada individual para cada dia

- [x] Include students in timetable once they are assigned to a class
- [x] Update students in timetable to "status: inactive" once they are assigned to a different class

- [x] PATCH /students/:id/set_status
    - [x]  Marcar presença de alunos
    - [x]  Marcar se fez lição
        - [x] Atualizar somente data informado
        - [ ] Atualizar somente horário informado (atualmente aceita qualquer horário) - corrigindo timezone

- [ ] Fix relation between Class x Class_students x Timetable "when updating any class details" - currently updates are not reflecting other tables
- [ ] Fix return message for errors


## Pending features

- [ ] Create Service to inactivate Student
  > Map effects on Student Table and StudentTimatable Table and Any other relation\
  > Update Migrations with status column
- [ ] Create entity TeacherTimetable
  > 1 teacher / hour
- [ ] Students financial status management
  - [ ]  Payment due date notifications
- [ ] Delete and Update (including the upload of files) class details
- [ ] Update GET Students to list Timetable info
- [ ] Create calendar on Student overview with all classes


## List of services

| Name | Type | Description | Endpoint |
| ------------------- | ------------------- | ------------------- | ------------------- |
|  Teachers | `POST` | Create teacher | `hostURL`/teacher |
|  Teachers | `POST` | Authenticate teacher | `hostURL`/teacher/sessions |
|  Teachers | `GET` | List teachers | `hostURL`/teacher |
|  Classes | `POST` | Create Class | `hostURL`/classes |
|  Classes | `PATCH` | Update Class Timetable Status | `hostURL`/classes/`:id`/set_status |
|  Classes | `GET` | List classes | `hostURL`/classes |
|  Classes | `GET` | Class Details | `hostURL`/classes/`:id`/details |
|  Students | `GET` | List students | `hostURL`/students |
|  Students | `PATCH` | Update Student Data | `hostURL`/students/`:id` |
|  Students | `PATCH` | Update Student Class Info | `hostURL`/students/`:id`/set_status |
|  Students | `POST` | Authenticate Student | `hostURL`/students/sessions |
|  Students | `POST` | Create student | `hostURL`/students |

