import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { LanguagesService } from 'src/languages/languages.service';
import { DockerSandBox } from './docker-sandbox';
import { CreateProblemDto } from './dtos/create-problem.dto';
import { SolveProblemDto } from './dtos/solve-problem.dto';
import { ProblemsRepo } from './repos/problems.repo';

@Injectable()
export class ProblemsService {
  constructor(
    private _problemsRepo: ProblemsRepo,
    private _languagesService: LanguagesService,
  ) {}

  async create(createBody: CreateProblemDto) {
    const problem = await this._problemsRepo.create(createBody);

    return problem;
  }

  async solve(problemId: string, body: SolveProblemDto) {
    const { languageId, code } = body;

    const problem = await this._problemsRepo.findById(problemId);
    const stdin_data = problem.input;

    if (!problem) {
      throw new NotFoundException('problem not found');
    }

    const language = await this._languagesService.findById(languageId);
    console.log(
      '🚀 ~ file: problems.service.ts:27 ~ ProblemsService ~ solve ~ language:',
      language,
    );

    // const path = __dirname + '/'; //current working path
    const folder = 'temp/' + this.random(10); //folder in which the temporary folder will be saved
    const vm_name = 'virtual_machine'; //name of virtual machine that we want to execute
    const timeout_value = 60; //Timeout Value, In Seconds

    const sandbox = new DockerSandBox({
      timeout_value,
      path: '/home/arwa/Documents/my-projects/online-judge/src/problems/',
      folder,
      vm_name,
      compiler_name: language.compilerName,
      file_name: language.fileName,
      code,
      output_command: language.outputCommand,
      languageName: language.languageName,
      e_arguments: language.extraArguments,
      stdin_data,
    });

    const { data, time, errors } = await sandbox.run();
    const output = data
      .trim()
      .split('\n')
      .map(function (string) {
        return string.trim();
      });
    console.log(
      '🚀 ~ file: problems.service.ts:68 ~ ProblemsService ~ solve ~ output:',
      output,
    );

    const expectedOutput = problem.output
      .trim()
      .split('\n')
      .map(function (string) {
        return string.trim();
      });
    console.log(
      '🚀 ~ file: problems.service.ts:76 ~ ProblemsService ~ solve ~ expectedOutput:',
      expectedOutput,
    );

    if (!expectedOutput.every((val, index) => val === output[index])) {
      throw new BadRequestException('wrong answer: test case failed');
    }

    return {
      output: data,
      code: code,
      languageId,
      errors,
      time,
    };
  }

  private random(size: number) {
    //returns a crypto-safe random
    return randomBytes(size).toString('hex');
  }
}
