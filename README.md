Perfis

- Professor

    Entidade Classes

    - Criar turmas e atribuir alunos
    - Listar turmas e horários
    - Marcar presença de alunos
    - Marcar se fez lição
    - Comunicados
    - Uploads
    - Comentários
    - [Edit] Aulas gravadas

        Alternativa: Gravar pelo Zoom e fazer upload manual

        Acoplar player de video

    Entidade Recursos

    - [Edit] Materiais de aula
    - Dicionário

    Entidade Notificações

    - Aviso gravar aulas
    - [Edit] Calendário de aulas
    - Due date Lição de casa

- Aluno

    Entidade Classes

    - Comentários
    - [View] Aulas gravadas

    Entidade Aluno

    - Barra de progresso
    - Pedido gravação de aula

    Entidade Recursos

    - [View] Materiais de aula
    - Dicionário

    Entidade Notificações

    - Pagamento: Chegando data, chegar na data, atrasado
    - [View] Calendário de aulas
    - Due date Lição de casa

Tabela **classes**:

CLASS_ID - unique

Tabela **students**:

student_id - unique

Tabela **classes_timetable**:

CLASS_APPOINTMENT_ID - unique

CLASS_ID

day

hour

students

# Main checklist:

- [x]  Criar turmas
    - [x] POST /classes
        - [x] Link com a tabela Teachers

- [x]  Editar turmas
    - [x] PATCH /classes/:id
        - [x] class_id atualizado automatico se necessário
        - [x] todos campos opcionais
        - [x] Link com a tabela Teachers

- [x] Editar turmas - adicionar aluno
    - [x] POST /students
    - [x] PATCH /classes/set_status
        - Enable Class status change on timetable
    - [x] PATCH /students/:id
        - [x] class_x_student= classes.id, classes.[relevant_details], students.id, students.name
        - [x] students= students[all], classes.id

- [x]  Aluno
    - [ ] GET /students
        - [x] Filter by name
        - [ ] Filter by class
        - [ ] Filter by teacher
    - [x] POST /student
    - [x] PATCH /student/:id/class

- [x]  Listar turmas e horários
    - [x] GET /classes - listar todas turmas com horários e alunos - filtros em dia, hora, teacher, level
        - [x] Filter by dia
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
- [!] Fix return message for errors



#------------#

- [ ] Create Service to inactivate Student
  > Update Migrations with status column
  > Student Table
  > StudentTimatable Table
  > Any other relation

- [ ] Criar entity Teachertimetable
  > 1 teacher por horário

- [ ] Financial status management
  > New Financial table


- Delete class
- Update Class
- Upload files
- Não alterar status da Timetable após a aula ter sido dada
- Get Students should list Timetable info
