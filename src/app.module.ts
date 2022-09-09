import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { SchedulesModule } from './schedules/schedules.module';
import { SchedulesService } from './schedules/schedules.service';
import { SchedulesController } from './schedules/schedules.controller';
import { ContactModule } from './contact/contact.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
   imports: [
      UserModule,
      SchedulesModule,
      ContactModule,
      PrismaModule,],
   controllers: [
      SchedulesController, AppController],
   providers: [
      UserService,
      SchedulesService, AppService],
})
export class AppModule { }
