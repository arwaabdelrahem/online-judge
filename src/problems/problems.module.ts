import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
  imports: [LanguagesModule],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
