import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Contact1662563979963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contact",
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
                        isUnique: true,
                    },
                    {
                        name: "phone",
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
        await queryRunner.dropTable("contact")
    }

}
