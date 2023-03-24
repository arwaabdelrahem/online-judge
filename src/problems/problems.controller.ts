import { Body, Controller, Post } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  @Post('/solve')
  async solve(@Body() body) {
    return this._problemsService.solve(body.code, body.language);
  }
}
