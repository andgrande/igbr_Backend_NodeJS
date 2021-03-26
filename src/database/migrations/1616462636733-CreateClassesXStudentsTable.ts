import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateClassesXStudentsTable1616462636733
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classes_x_students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'class_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'class_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'student_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'student_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'teacher_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'teacher_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'classes_x_students',
      new TableForeignKey({
        name: 'ClassesStudentsTeacherId',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'classes_x_students',
      new TableForeignKey({
        name: 'ClassesStudentsClassId',
        columnNames: ['class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'classes_x_students',
      'ClassesStudentsClassId',
    );
    await queryRunner.dropForeignKey(
      'classes_x_students',
      'ClassesStudentsTeacherId',
    );

    await queryRunner.dropTable('classes_x_students');
  }
}
