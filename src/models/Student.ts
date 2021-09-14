import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Class from './Class';
import Classes_x_Students from './Classes_x_Students';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  class_id: string;

  @ManyToOne(() => Class, classes => classes.id)
  @JoinColumn({ name: 'class_id' })
  classes: Class;

  @ManyToMany(
    () => Classes_x_Students,
    classes_x_students => classes_x_students.students,
    { cascade: true },
  )
  classes_x_students: Classes_x_Students[];

  @Column()
  CPF: string;

  @Column()
  address: string;

  @Column()
  CEP: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Student;
