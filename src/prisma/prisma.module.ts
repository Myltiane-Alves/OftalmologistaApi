import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';

@Module({
   exports: [PrismaService],
   controllers: [],
   providers: [
      PrismaService,
   ],

})
export class PrismaModule { }
