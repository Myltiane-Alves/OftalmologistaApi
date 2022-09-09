import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
   BadRequestException,
   NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService {
   constructor(
      private prisma: PrismaService,
      private userService: UserService
   ) {}


   async get(id: number) {
      id = Number(id);

      if(isNaN(id)) {
         throw new BadRequestException('ID is required')
      }

      const user = await this.prisma.users.findUnique({
         where: {
            user_id: id,
         }
      })

      if(!user) {
         throw new NotFoundException('User not found')
      }

      return user;
   }

   async create({
      name,
      cpf,
      birthAt,
      phone,
      email,
      password
   }: {
      name: string,
      cpf: string,
      birthAt: Date,
      phone: string,
      email: string,
      password: string
   }) {

      if(!name) {
         throw new BadRequestException('Name is required.')
      }

      if(!cpf) {
         throw new BadRequestException('CPF is required.')
      }

      if(!phone) {
         throw new BadRequestException('Phone is required.')
      }

      if(!email) {
         throw new BadRequestException('Email is required.')
      }

      if(!password) {
         throw new BadRequestException('Password is required.')
      }
   }
}
