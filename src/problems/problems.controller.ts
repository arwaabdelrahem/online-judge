import { Body, Controller, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/is-public.decorator';
import { SolveProblemDto } from './dtos/solve-problem.dto';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  // @Post('/')
  // async create(@Body() createBody: CreateProblemDto) {
  //   return this._problemsService.create(createBody);
  // }

  // @Post('/:problemId/solve')
  // async solve(
  //   @Param('problemId') problemId: string,
  //   @Body() body: SolveProblemDto,
  // ) {
  //   return this._problemsService.solve(problemId, body);
  // }

  @Public()
  @Post('/:problemId/solve')
  async solve(
    @Param('problemId') problemId: string,
    @Body() body: SolveProblemDto,
  ) {
    return this._problemsService.solve(problemId, body);
  }
}
