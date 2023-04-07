import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { LanguagesRepo } from './repos/languages.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { LanguageSchema } from './schemas/languages.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DatabaseModelNames.LANGUAGE_MODEL,
        useFactory: () => {
          const schema = LanguageSchema;

          return schema;
        },
      },
    ]),
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService, LanguagesRepo],
  exports: [LanguagesService],
})
export class LanguagesModule {}
