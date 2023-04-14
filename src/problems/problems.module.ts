import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { LanguagesModule } from 'src/languages/languages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { ProblemSchema } from './schemas/problems.schema';
import { ProblemsRepo } from './repos/problems.repo';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DatabaseModelNames.PROBLEM_MODEL,
        useFactory: () => {
          const schema = ProblemSchema;

          return schema;
        },
      },
    ]),
    LanguagesModule,
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService, ProblemsRepo],
})
export class ProblemsModule {}
