import { Body, Controller, Post } from '@nestjs/common';
import { CreateLanguageDto } from './dtos/create-language.dto';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private _languagesService: LanguagesService) {}

  @Post()
  async create(@Body() createBody: CreateLanguageDto) {
    return this._languagesService.create(createBody);
  }
}
