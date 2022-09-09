import { Controller } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
   constructor(private userService: UserService){}

   @Get(':id')
   async show(@Param('id') id) {
      return this.userService.get(id);
   }

   @Post()
   async create(@Body() data: CreateUserDto) {
      return this.userService.create(data);
   }

}
