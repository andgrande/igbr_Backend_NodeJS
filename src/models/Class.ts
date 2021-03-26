import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Teacher from './Teacher';
import Classes_x_Students from './Classes_x_Students';
import ClassesTimetable from './ClassesTimetable';

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string;

  @Column()
  class_level: string;

  @Column()
  class_day: string;

  @Column()
  class_hour: number;

  @Column()
  class_duration: number;

  @Column()
  weeks_duration: number;

  @Column()
  start_date: Date;

  // @Column()
  // class_teacher: string;

  // @ManyToOne(() => Teacher, teacher_name => teacher_name.teacher_name)
  // @JoinColumn({ name: 'class_teacher' })
  // teacher_name: Teacher;

  @OneToMany(
    () => ClassesTimetable,
    classesTimetable => classesTimetable.classes,
    { cascade: true },
  )
  classesTimetable: ClassesTimetable[];

  @OneToMany(
    () => Classes_x_Students,
    classes_x_students => classes_x_students.classes,
    { cascade: true },
  )
  classes_x_students: Classes_x_Students[];

  @Column()
  teacher_id: string;

  @ManyToOne(() => Teacher, teacher => teacher.classes, { eager: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Class;
