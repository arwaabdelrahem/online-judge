import { Body, Controller, Post } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { SolveQuestionDto } from './dtos/solve-question.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  @Post('/solve')
  async solve(@Body() body: SolveQuestionDto) {
    return this._problemsService.solve(body);
  }
}
