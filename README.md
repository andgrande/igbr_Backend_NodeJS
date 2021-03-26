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

- [ ] Criar entity Teachertimetable
    - [ ] 1 teacher por horário

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
    - [ ] GET /classes/:class_id - listar turma específica
    - [ ] GET /classes/timetable - listar turmas por horários

- [x] Relations tabela timetable
- [x] Save object in timetable
- [ ] Include students in timetable onde they are assigned to a class
- [ ] Remove students from timetable onde they are assigned to a different class

- [ ]  Marcar presença de alunos
    - [ ] PATCH /students/:id/set_status
        - [ ] Enviando class, dia e horário

- [ ]  Marcar se fez lição
    - [ ] PATCH /students/:id/set_class
        - [ ] Enviando class e student

- [x] Ao criar entrada na table classes, gerar entrada na classes_timetable para cada aula

------------
- Delete class
