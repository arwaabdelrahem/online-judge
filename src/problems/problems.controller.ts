import { Body, Controller, Post, Res } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private _problemsService: ProblemsService) {}

  @Post('/solve')
  async solve(@Body() body, @Res() res) {
    return this._problemsService.solve(body.code, body.language, res);
  }
}
