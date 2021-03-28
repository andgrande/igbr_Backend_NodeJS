import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Class from './Class';

@Entity('classes_timetable')
class ClassesTimetable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string;

  @ManyToOne(() => Class, classes => classes.classesTimetable)
  @JoinColumn({ name: 'class_id' })
  classes: Class;

  @Column()
  class_status: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('jsonb')
  students_presence: Record<string, unknown>;

  @Column()
  class_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassesTimetable;
