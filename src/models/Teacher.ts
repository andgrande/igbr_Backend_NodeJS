import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Class from './Class';

@Entity('teachers')
class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacher_name: string;

  // @OneToMany(() => Class, class_name => class_name.teacher_name)
  // class_name: Class[];

  @Column()
  teacher_email: string;

  @Column()
  password: string;

  @OneToMany(() => Class, classes => classes.teacher)
  classes: Class[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Teacher;
