import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTeacherIdOnClassTable1616424688341
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'classes',
      new TableColumn({
        name: 'teacher_id',
        type: 'uuid',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('classes', 'teacher_id');
  }
}
