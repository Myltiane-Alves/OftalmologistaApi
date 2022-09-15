import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { parse } from 'date-fns';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
   constructor(
      private authService: AuthService,
      private userService: UserService
   ) {}

   @Post('register')
   async register(
      @Body('name') name,
      @Body('email') email,
      @Body('password') password,
      @Body('birthAt') birthAt,
      @Body('document') document,
      @Body('phone') phone,

   ) {

      if(birthAt) {
         try {
            birthAt = parse(birthAt, 'yyyy-MM-dd', new Date());

         } catch(e) {
            throw new BadRequestException('Invalid date')
         }
      }

      const user = await this.userService.create({
         name,
         email,
         password,
         birthAt,
         document,
         phone
      });

      return {user};
   }
}
