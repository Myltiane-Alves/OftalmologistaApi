import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
    constructor(private db: PrismaService) {}

    async get(id: number) {
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('ID is not a number');
        }

        return this.db.contact.findUnique({
            where: {
                id,
            },
        });
    }

    async list() {
        return this.db.contact.findMany();
    }

    async create({
        name,
        email,
        phone,
        message,
    }: {
        name: string;
        email: string;
        phone: string;
        message: string;
    }){

        if(!name) {
            throw new BadRequestException('O nome é obrigatório.');
        }

        if(!email) {
            throw new BadRequestException('O e-mail é obrigatório.');
        }

        if(!phone) {
            throw new BadRequestException('O telefone é obrigatório.');
        }

        if(!message) {
            throw new BadRequestException('A mensagem é obrigatória.');
        }

        const contact = await this.db.contact.create({
            data: {
                name,
                email,
                phone,
                message,

            }
        })

        return contact;
    }

    async delete(id: number) {
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('ID is invalid');
        }

        if(!(await this.get(id))) {
            throw new NotFoundException('ID not exists');
        }

        return this.db.contact.delete({
            where: {
                id,
            },
        });
    }
}
