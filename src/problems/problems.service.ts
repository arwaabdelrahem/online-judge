import { Injectable } from '@nestjs/common';

@Injectable()
export class ProblemsService {
  async solve(code, language) {
    console.log(
      '🚀 ~ file: problems.service.ts:7 ~ ProblemsService ~ solve ~ language:',
      language,
    );
    console.log(
      '🚀 ~ file: problems.service.ts:7 ~ ProblemsService ~ solve ~ code:',
      code,
    );
    return;
  }
}
