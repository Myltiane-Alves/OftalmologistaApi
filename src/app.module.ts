import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';


@Module({
   imports: [
      MailModule,
      AuthModule,
      UserModule,
      ContactModule,
      PrismaModule,],
   controllers: [
      UserController, AppController],

})
export class AppModule { }
