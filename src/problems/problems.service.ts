import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { compilerArray } from '../common/compilers';
import { DockerSandBox } from './docker-sandbox';
import { SolveProblemDto } from './dtos/solve-problem.dto';
import { LanguagesService } from 'src/languages/languages.service';
import { CreateProblemDto } from './dtos/create-problem.dto';
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

  async solve(body: SolveProblemDto) {
    const { languageId, code, stdin } = body;

    // const language = await this._languagesService.findById(languageId);
    // console.log(
    //   '🚀 ~ file: problems.service.ts:27 ~ ProblemsService ~ solve ~ language:',
    //   language,
    // );

    // const path = __dirname + '/'; //current working path
    const folder = 'temp/' + this.random(10); //folder in which the temporary folder will be saved
    const vm_name = 'virtual_machine'; //name of virtual machine that we want to execute
    const timeout_value = 60; //Timeout Value, In Seconds

    // {timeout_value,
    // path: '/home/arwa/Documents/my-projects/online-judge/src/problems/',
    // folder,
    // vm_name,
    // compiler_name: language.compilerName,
    // file_name: language.fileName,
    // code,
    // output_command: language.outputCommand,
    // languageName: language.languageName,
    // e_arguments: language.extraArguments,
    // stdin_data: stdin,}
    const sandbox = new DockerSandBox({
      timeout_value,
      path: '/home/arwa/Documents/my-projects/online-judge/src/problems/',
      folder,
      vm_name,
      compiler_name: compilerArray[languageId][0],
      file_name: compilerArray[languageId][1],
      code,
      output_command: compilerArray[languageId][2],
      languageName: compilerArray[languageId][3],
      e_arguments: compilerArray[languageId][4],
      stdin_data: stdin,
    });

    const { data, time, errors } = await sandbox.run();

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
