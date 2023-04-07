import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { BaseRepo } from 'src/common/utils/base.repo';
import { Language, LanguageDocument } from '../schemas/languages.schema';

export class LanguagesRepo extends BaseRepo<Language> {
  constructor(
    @InjectModel(DatabaseModelNames.LANGUAGE_MODEL)
    private _languagesModel: Model<LanguageDocument>,
  ) {
    super(_languagesModel);
  }
}
