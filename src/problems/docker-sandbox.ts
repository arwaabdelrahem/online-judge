import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { exec } from 'promisify-child-process';
import * as fs from 'fs';
import { ExecutionResponse } from 'src/common/interfaces/execution-response';

export class DockerSandBox {
  public timeout_value;
  public path;
  public folder;
  public vm_name;
  public compiler_name;
  public file_name;
  public code;
  public output_command;
  public langName;
  public extra_arguments;
  public stdin_data;

  constructor({
    timeout_value,
    path,
    folder,
    vm_name,
    compiler_name,
    file_name,
    code,
    output_command,
    languageName,
    e_arguments,
    stdin_data,
  }) {
    this.timeout_value = timeout_value;
    this.path = path;
    this.folder = folder;
    this.vm_name = vm_name;
    this.compiler_name = compiler_name;
    this.file_name = file_name;
    this.code = code;
    this.output_command = output_command;
    this.langName = languageName;
    this.extra_arguments = e_arguments;
    this.stdin_data = stdin_data;
  }

  async run() {
    try {
      await this.prepare(
        this.path,
        this.folder,
        this.file_name,
        this.code,
        this.langName,
        this.stdin_data,
      );

      return this.execute(
        this.path,
        this.folder,
        this.file_name,
        this.timeout_value,
        this.vm_name,
        this.compiler_name,
        this.output_command,
        this.extra_arguments,
        this.langName,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async prepare(
    path: string,
    folder: string,
    file_name: string,
    code: string,
    langName: string,
    stdin_data: string,
  ) {
    const command =
      'mkdir ' +
      path +
      folder +
      ' && cp ' +
      path +
      '/Payload/* ' +
      path +
      folder +
      ' && chmod 777 ' +
      path +
      folder;

    const { stderr } = await exec(command);

    if (stderr) {
      throw new InternalServerErrorException(stderr);
    }

    fs.writeFileSync(path + folder + '/' + file_name, code, {
      encoding: 'utf8',
    });

    console.log(langName + ' file was saved!:112');
    await exec("chmod 777 '" + path + folder + '/' + file_name + "'");

    fs.writeFileSync(path + folder + '/inputFile', stdin_data, {
      encoding: 'utf8',
    });

    console.log('Input file was saved!:119');
    return;
  }

  async execute(
    path: string,
    folder: string,
    file_name: string,
    timeout_value: number,
    vm_name: string,
    compiler_name: string,
    output_command: string,
    extra_arguments: string,
    langName: string,
  ): Promise<ExecutionResponse> {
    try {
      const myC = 0; //variable to enforce the timeout_value
      const fullPath = path + folder;

      //this statement is what is executed
      const st =
        path +
        'DockerTimeout.sh ' +
        timeout_value +
        "s -e 'NODE_PATH=/usr/local/lib/node_modules' -i -t -v  \"" +
        path +
        folder +
        '":/usercode ' +
        vm_name +
        ' /usercode/script.sh ' +
        compiler_name +
        ' ' +
        file_name +
        ' ' +
        output_command +
        ' ' +
        extra_arguments;

      //log the statement in console
      console.log('DockerTimeout command:157', st);

      //execute the Docker, This is done ASYNCHRONOUSLY
      const { stderr } = await exec(st);

      if (stderr) {
        console.log(
          '🚀 ~ file: docker-sandbox.ts:154 ~ DockerSandBox ~ stderr:',
          stderr,
        );
        return { data: '', errors: stderr as string };
        // throw new InternalServerErrorException(stderr);
      }
      console.log('----------------------------------------------');
      //   Displaying the checking message after 1 second interval, testing purposes only
      console.log(
        'Checking ' + this.path + this.folder + ':167 for completion: ' + myC,
      );

      const executionData = await this.readFiles(
        path,
        folder,
        myC,
        timeout_value,
        langName,
      );
      console.log('ATTEMPTING TO REMOVE: ' + fullPath);
      // await exec('rm -r ' + fullPath);

      return executionData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async readFiles(
    path: string,
    folder: string,
    myC: number,
    timeout_value: number,
    langName: string,
  ): Promise<ExecutionResponse> {
    try {
      let completedData = fs.readFileSync(path + folder + '/completed', 'utf8');

      //if file is not available yet and the file interval is not yet up carry on
      // if (err && myC < timeout_value) {
      //   return;
      // } else
      if (myC < timeout_value) {
        //if file is found simply display a message and proceed
        //check for possible errors
        let errors = fs.readFileSync(path + folder + '/errors', 'utf8');

        if (!errors) errors = '';
        // console.log('Error file:205 ', errors);
        // console.log('Main File:206 ', completedData);

        const lines = completedData
          .toString()
          .split('*-COMPILEBOX::ENDOFOUTPUT-*');

        completedData = lines[0];
        const time = lines[1];

        //return the data to the calling function
        return { data: completedData, time, errors };
      } else {
        //if time is up. Save an error message to the data variable
        //Since the time is up, we take the partial output and return it.
        let logfileData = fs.readFileSync(
          path + folder + '/logfile.txt',
          'utf8',
        );

        if (!logfileData) logfileData = '';
        logfileData += '\nExecution Timed Out';
        console.log('Timed Out:228 ' + folder + ' ' + langName);

        let errors = fs.readFileSync(path + folder + '/errors', 'utf8');

        if (!errors) errors = '';
        const lines = logfileData.toString().split('*---*');
        logfileData = lines[0];
        const time = lines[1];

        return { data: logfileData, time, errors };
      }
    } catch (error) {
      return { data: '', errors: error.message };
    }
  }
}
