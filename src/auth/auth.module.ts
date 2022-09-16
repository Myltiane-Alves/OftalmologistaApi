import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
   imports: [
      PrismaModule,
      UserModule,
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
               expiresIn: process.env.JWT_EXPIRE
            },
         })
      })
   ],
   controllers: [
      AuthController
   ],
   providers: [
      AuthService
   ],
})
export class AuthModule { }
