import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private jwtService: JwtService,
      private userService: UserService
   ) {}

   async getToken(userId: number) {

      const { email, photo, id, person } = await this.userService.get(userId);
      const { name } = person;

      return this.jwtService.sign({ name, email, photo, id })

   }

   async login({ email, password }: { email: string; password: string }) {

      const user = await this.userService.getByEmail(email);

      console.log(user.id, password);
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

}
