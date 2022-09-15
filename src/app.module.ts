import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { SchedulesModule } from './schedules/schedules.module';
import { SchedulesService } from './schedules/schedules.service';
import { SchedulesController } from './schedules/schedules.controller';
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
      AuthController,
      UserController, SchedulesController, AppController],
   providers: [
      AuthService,
      UserService,
      SchedulesService,
   ],
})
export class AppModule { }
