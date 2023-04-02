import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { DockerSandBox } from './docker-sandbox';
import { compilerArray } from './compilers';
import { Response } from 'express';

@Injectable()
export class ProblemsService {
  async solve(code, language, res: Response) {
    const stdin = '';

    const folder = 'temp/' + this.random(10); //folder in which the temporary folder will be saved
    const path = __dirname + '/'; //current working path
    const vm_name = 'virtual_machine'; //name of virtual machine that we want to execute
    const timeout_value = 60; //Timeout Value, In Seconds

    const sandbox = new DockerSandBox({
      timeout_value,
      path: '/home/arwa/Documents/my-projects/online-judge/src/problems/',
      folder,
      vm_name,
      compiler_name: compilerArray[language][0],
      file_name: compilerArray[language][1],
      code,
      output_command: compilerArray[language][2],
      languageName: compilerArray[language][3],
      e_arguments: compilerArray[language][4],
      stdin_data: stdin,
    });

    // throw new BadRequestException(' BAAAADD');
    // (data, exec_time: any, err: any) => {
    //   console.log('Data: received: ' + data);
    //   return res.send({
    // output: data,
    // langid: language,
    // code: code,
    // errors: err,
    // time: exec_time,
    //   });
    // }
    const response = await sandbox.run();

    return {
      // output: data,
      //   langid: language,
      //   code: code,
      //   errors: err,
      //   time: exec_time,
    };
  }

  private random(size) {
    //returns a crypto-safe random
    return randomBytes(size).toString('hex');
  }
}
