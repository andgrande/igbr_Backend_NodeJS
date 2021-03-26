import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyToStudentAndClassTables1616441139565
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'class_id');
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'class_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'classes',
      new TableForeignKey({
        name: 'TeacherId',
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teachers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'ClassId',
        columnNames: ['class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classes', 'TeacherId');
    await queryRunner.dropForeignKey('students', 'ClassId');

    await queryRunner.dropColumn('students', 'class_id');
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'class_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
