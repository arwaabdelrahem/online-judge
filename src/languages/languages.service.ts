import { Injectable } from '@nestjs/common';
import { LanguagesRepo } from './repos/languages.repo';
import { CreateLanguageDto } from './dtos/create-language.dto';

@Injectable()
export class LanguagesService {
  constructor(private _languagesRepo: LanguagesRepo) {}

  async create(createBody: CreateLanguageDto) {
    console.log(
      '🚀 ~ file: languages.service.ts:10 ~ LanguagesService ~ create ~ createBody:',
      createBody,
    );
    const language = await this._languagesRepo.create(createBody);

    return language;
  }
}
