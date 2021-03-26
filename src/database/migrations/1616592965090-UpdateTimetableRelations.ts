import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class UpdateTimetableRelations1616592965090
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('classes_timetable', 'students_presence');
    await queryRunner.addColumn(
      'classes_timetable',
      new TableColumn({
        name: 'students_presence',
        type: 'json',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumn('classes_timetable', 'class_id');
    await queryRunner.addColumn(
      'classes_timetable',
      new TableColumn({
        name: 'class_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'classes_timetable',
      new TableForeignKey({
        name: 'TimetableClassID',
        columnNames: ['class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('classes_timetable', 'students_presence');

    await queryRunner.addColumn(
      'classes_timetable',
      new TableColumn({
        name: 'students_presence',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.dropForeignKey('classes_timetable', 'TimetableClassID');

    await queryRunner.dropColumn('classes_timetable', 'class_id');
    await queryRunner.addColumn(
      'classes_timetable',
      new TableColumn({
        name: 'class_id',
        type: 'varchar',
      }),
    );
  }
}
