import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private userService: UserService
   ) {}

   async login({ email, password}: { email: string, password: string}) {

      const user = await this.userService.getByEmail(email)
   }

}