import { Controller, Post, Body, BadRequestException, Get, UseGuards } from '@nestjs/common';
import { parse } from 'date-fns';
import { User } from 'src/user/user.decorator';
import { UserService } from 'src/user/user.service';
import { Auth } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
      private userService: UserService,
      private jwtService: JwtService,
   ) {}

   @Post()
   async verifyEmail(@Body('email') email) {

      try {
         await this.userService.getByEmail(email);
         return { exists: true };
      } catch (e) {
         return { exists: false };

      }
   }

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

      const token = await this.authService.getToken(user.id);

      return {user, token};
   }

   @Post('login')
   async login(@Body('email') email, @Body('password') password) {
    return this.authService.login({ email, password })
   }

   @UseGuards(AuthGuard)
   @Get('me')
   async me(@Auth() auth, @User() user) {

    return {
      auth,
      user
    }
   }
}


