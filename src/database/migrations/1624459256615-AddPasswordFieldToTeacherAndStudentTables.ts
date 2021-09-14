import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPasswordFieldToTeacherAndStudentTables1624459256615
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'teachers',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'password');
    await queryRunner.dropColumn('teachers', 'password');
  }
}
