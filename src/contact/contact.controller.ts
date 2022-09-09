import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactsDto } from './dto/create-contacts.dto';

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
    async create(@Body() data: CreateContactsDto) {
      return this.contactService.create(data);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {
      return this.contactService.delete(Number(id));
    }
 }
