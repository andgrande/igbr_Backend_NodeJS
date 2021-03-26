import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropTeacherNameFromClasses1616449107246
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('classes', 'class_teacher');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'classes',
      new TableColumn({
        name: 'class_teacher',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
