import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddWeeksDurationAndStartDateToClassesTable1616625837980
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'classes',
      new TableColumn({
        name: 'start_date',
        type: 'timestamp with time zone',
      }),
    );

    await queryRunner.addColumn(
      'classes',
      new TableColumn({
        name: 'weeks_duration',
        type: 'int',
      }),
    );

    await queryRunner.addColumn(
      'classes_timetable',
      new TableColumn({
        name: 'class_number',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('classes_timetable', 'class_number');
    await queryRunner.dropColumn('classes', 'weeks_duration');
    await queryRunner.dropColumn('classes', 'start_date');
  }
}
