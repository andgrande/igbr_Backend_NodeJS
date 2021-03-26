import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClassesTable1616014799706
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'classes',
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
            type: 'varchar',
          },
          {
            name: 'class_level',
            type: 'varchar',
          },
          {
            name: 'class_day',
            type: 'varchar',
          },
          {
            name: 'class_hour',
            type: 'int',
          },
          {
            name: 'class_duration',
            type: 'decimal',
          },
          {
            name: 'class_teacher',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes');
  }
}
