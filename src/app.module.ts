import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';


@Module({
   imports: [
      AuthModule,
      UserModule,
      PrismaModule,],
   controllers: [
      UserController, AppController],

})
export class AppModule { }
