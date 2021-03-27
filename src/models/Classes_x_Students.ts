import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Class from './Class';
import Student from './Student';

@Entity('classes_x_students')
class Classes_x_Students {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, students => students.classes_x_students)
  @JoinColumn({ name: 'student_id' })
  students: Student;

  @ManyToOne(() => Class, classes => classes.classes_x_students)
  @JoinColumn({ name: 'class_id' })
  classes: Class;

  @Column()
  class_id: string;

  @Column()
  class_name: string;

  @Column()
  student_id: string;

  @Column()
  student_name: string;

  @Column()
  teacher_id: string;

  @Column()
  teacher_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Classes_x_Students;
