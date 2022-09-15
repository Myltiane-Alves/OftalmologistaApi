import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
   BadRequestException,
   NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

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

   async getByEmail(email: string) {

      if(!email) {
         throw new BadRequestException("Email is required.")
      }

      const user = await this.prisma.user.findUnique({
         where: {
            email,
         },
         include: {
            person: true,
         }
      });

      delete user.password;

      if(!user) {
         throw new NotFoundException("User not found.")
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

   async update(id: number, {
      name,
      document,
      birthAt,
      phone,
      email,

   }: {
      name?: string,
      document?: string;
      birthAt?: Date,
      phone?: string;
      email?: string,
   }) {

      id = Number(id);

      if (isNaN(id)) {
         throw new BadRequestException('ID is required')
      }

      const dataPerson = {} as Prisma.PersonUpdateInput;
      const dataUser = {} as Prisma.UserUpdateInput;

      if (name) {
         dataPerson.name = name;
      }

      if (birthAt) {
         dataPerson.birthAt = birthAt;
      }

      if (phone) {
         dataPerson.phone = phone;
      }

      if (document) {
         dataPerson.document = document;
      }

      if (email) {
         dataUser.email = email;
      }

      // if (photo) {
      //    dataUser.photo = photo;
      // }

      const user = await this.get(id);

      if (dataPerson) {
         await this.prisma.person.update({
            where: {
               id,
            },
            data: dataUser,
         })
      }

      if (dataUser) {
         await this.prisma.user.update({
            where: {
               id,
            },
            data: dataUser,
         })
      }

      return this.get(id);

   }
}
