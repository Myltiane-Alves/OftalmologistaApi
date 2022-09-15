import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SchedulesModule } from './schedules/schedules.module';


import { ContactModule } from './contact/contact.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';


@Module({
   imports: [
      AuthModule,
      UserModule,
      SchedulesModule,
      ContactModule,
      PrismaModule,],
   controllers: [
      UserController, AppController],

})
export class AppModule { }
