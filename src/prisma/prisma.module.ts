import { PrismaService } from './prisma.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    exports: [PrismaService],
    controllers: [],
    providers: [
        PrismaService,],
})
export class PrismaModule { }
