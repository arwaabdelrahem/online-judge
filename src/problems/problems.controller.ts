import { Body, Controller, Post } from '@nestjs/common';
import { CreateProblemDto } from './dtos/create-problem.dto';
import { SolveProblemDto } from './dtos/solve-problem.dto';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  @Post('/')
  async create(@Body() createBody: CreateProblemDto) {
    return this._problemsService.create(createBody);
  }

  @Post('/solve')
  async solve(@Body() body: SolveProblemDto) {
    return this._problemsService.solve(body);
  }
}
