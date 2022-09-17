import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
   imports: [

      PrismaModule,
      UserModule,
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
               expiresIn: 60 * 60 * 24 * 7,
            }
         })
      })
   ],
   controllers: [
      AuthController,
   ],
   providers: [
      AuthService,
   ],

})
export class AuthModule { }
