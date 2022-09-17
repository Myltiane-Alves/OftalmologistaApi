import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
   constructor(
      private jwtService: JwtService,
      private userService: UserService,
      private prisma: PrismaService,
   ) {}

   async getToken(userId: number) {

      const { email, photo, id, person } = await this.userService.get(userId);
      const { name } = person;

      return this.jwtService.sign({ name, email, photo, id })

   }

   async login({ email, password }: { email: string; password: string }) {

      const user = await this.userService.getByEmail(email);

      await this.userService.checkPassword(user.id, password)

      const token = await this.getToken(user.id);

      return {
         token,
      }
   }

   async decodeToken(token: string) {

      try {
         await this.jwtService.verify(token);
      } catch (e) {
         throw new UnauthorizedException(e.message);
      }

      return this.jwtService.decode(token);

   }

   async recovery(email: string) {

      const { id, person } = await this.userService.getByEmail(email);
      const { name } = person;

      const token = await this.jwtService.sign({ id }, {
         expiresIn: 30 * 60
      })

      await this.prisma.passwordRecovery.create({
         data: {
            userId: id,
            token,
         }
      })

      return { success: true}
   }

}
