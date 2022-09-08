import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

// aqui se define os metodos que serão usados no controller
@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService){}

    @Get(':id')
    async show(@Param('id') id) {
        return this.contactService.get(Number(id));
    }

    @Get()
    async list() {
        return this.contactService.list();
    }

    @Post()
    async create(@Body() body) {
        return this.contactService.create(body);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {
        return this.contactService.delete(Number(id));
    }
 }
