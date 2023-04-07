import { Body, Controller, Post } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dtos/create-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private _languagesService: LanguagesService) {}

  @Post()
  async create(@Body() createBody: CreateLanguageDto) {
    return this._languagesService.create(createBody);
  }
}
