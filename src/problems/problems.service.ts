import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { compilerArray } from './compilers';
import { DockerSandBox } from './docker-sandbox';
import { SolveQuestionDto } from './dtos/solve-question.dto';
import { LanguagesService } from 'src/languages/languages.service';

@Injectable()
export class ProblemsService {
  constructor(private _languagesService: LanguagesService) {}

  async solve(body: SolveQuestionDto) {
    const { languageId, code, stdin } = body;

    // const path = __dirname + '/'; //current working path
    const folder = 'temp/' + this.random(10); //folder in which the temporary folder will be saved
    const vm_name = 'virtual_machine'; //name of virtual machine that we want to execute
    const timeout_value = 60; //Timeout Value, In Seconds

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
