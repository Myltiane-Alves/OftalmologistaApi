import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1662561468331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "cpf",
                        type: "varchar",
                        length: "250",
                        isNullable: false,
                    },
                    {
                        name: "birthAt",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "phone",
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
                        name: "password",
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
        await queryRunner.dropTable("users")
    }

}
