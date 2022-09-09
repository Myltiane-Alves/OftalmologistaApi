import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
   imports: [
      PrismaModule
   ],
   controllers: [
      UserController,
   ],
   providers: [
      UserService
   ],
})
export class UserModule { }
