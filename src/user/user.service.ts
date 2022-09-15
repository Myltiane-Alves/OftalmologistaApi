import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import  bcrypt  from 'bcrypt';

import {
   BadRequestException,
   NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService {
   constructor(
      private prisma: PrismaService,

   ) {}


   async get(id: number) {
      id = Number(id);

      if(isNaN(id)) {
         throw new BadRequestException('ID is required')
      }

      const user = await this.prisma.user.findUnique({
         where: {
            id,
         },
         include: {
            person: true
         }
      })

      // if(!hash) {
      //    delete user.password;
      // }
      if(!user) {
         throw new NotFoundException('User not found')
      }

      return user;
   }

   async create({
      name,
      document,
      birthAt,
      phone,
      email,
      password
   }: {
      name: string,
      document?: string,
      birthAt?: Date,
      phone?: string,
      email: string,
      password: string
   }) {

      if(!name) {
         throw new BadRequestException('Name is required.')
      }

      if(!document) {
         throw new BadRequestException('document is required.')
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

      if(birthAt && birthAt.toString().toLowerCase() === 'invalid date') {
         throw new BadRequestException('Birth date is invalid.')
      }

      // let user = null;

      // try {
      //    user = await this.getByEmail(email)
      // } catch(e) {

      // }

      const userCreated = await this.prisma.user.create({
         data: {
            person: {
               create: {
                  name,
                  birthAt,
                  phone,
                  document
               },
            },
            email,
            password,
         },
         include: {
            person: true
         }
      })

      delete userCreated.password;

      return userCreated;
   }
}
