import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Schedules1662564009240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "schedules",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                    },
                    {
                        name: "consult",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                    },
                    {
                        name: "message",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedules")
    }

}
