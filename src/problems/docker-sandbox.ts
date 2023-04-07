import { InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
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

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (stderr) {
          console.log('EXEC stderr:96 ', stderr);
          reject(stderr);
        }

        fs.writeFile(path + folder + '/' + file_name, code, (err) => {
          if (err) {
            console.log('ERRORRR WRITE FILE:102', err);
            reject(err);
          } else {
            console.log(langName + ' file was saved!:105');
            exec("chmod 777 '" + path + folder + '/' + file_name + "'");

            fs.writeFile(path + folder + '/inputFile', stdin_data, (err) => {
              if (err) {
                console.log('ERROR:110', err);
                reject(err);
              } else {
                console.log('Input file was saved!:113');
                resolve('Input file was saved!');
              }
            });
          }
        });
      });
    });
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
    let myC = 0; //variable to enforce the timeout_value
    const fullPath = path + folder;

    //this statement is what is executed
    const st =
      path +
      'DockerTimeout.sh ' +
      timeout_value +
      "s -u mysql -e 'NODE_PATH=/usr/local/lib/node_modules' -i -t -v  \"" +
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
    console.log('st:157', st);

    //execute the Docker, This is done ASYNCHRONOUSLY
    return new Promise((resolve, reject) => {
      exec(st);
      console.log('----------------------------------------------');
      //Check For File named "completed" after every 1 second
      const intid = setInterval(() => {
        //   Displaying the checking message after 1 second interval, testing purposes only
        console.log(
          'Checking ' + this.path + this.folder + ':167 for completion: ' + myC,
        );
        myC = myC + 1;
        fs.readFile(path + folder + '/completed', 'utf8', (err, data) => {
          console.log(
            '🚀 ~ file: docker-sandbox.ts:172 ~ DockerSandBox ~ fs.readFile ~ data:',
            data,
          );
          console.log(
            '🚀 ~ file: docker-sandbox.ts:178 ~ DockerSandBox ~ fs.readFile ~ err:',
            err,
          );
          //if file is not available yet and the file interval is not yet up carry on
          if (err && myC < timeout_value) {
            reject(err);
            return;
          }
          //if file is found simply display a message and proceed
          else if (myC < timeout_value) {
            console.log('DONE:186');
            //check for possible errors
            fs.readFile(path + folder + '/errors', 'utf8', (err, errors) => {
              console.log(
                '🚀 ~ file: docker-sandbox.ts:190 ~ DockerSandBox ~ fs.readFile ~ errors:',
                errors,
              );
              if (err) {
                reject(err);
              }
              if (!errors) errors = '';
              console.log('Error file: ', errors);
              console.log('Main File', data);
              const lines = data
                .toString()
                .split('*-COMPILEBOX::ENDOFOUTPUT-*');
              data = lines[0];
              const time = lines[1];
              console.log('Time: ', time);
              resolve({ data, time, errors });
            });
            //return the data to the calling function
          }
          //if time is up. Save an error message to the data variable
          else {
            //Since the time is up, we take the partial output and return it.
            fs.readFile(path + folder + '/logfile.txt', 'utf8', (err, data) => {
              console.log(
                '🚀 ~ file: docker-sandbox.ts:214 ~ DockerSandBox ~ fs.readFile ~ err:',
                err,
              );
              console.log(
                '🚀 ~ file: docker-sandbox.ts:218 ~ DockerSandBox ~ fs.readFile ~ data:',
                data,
              );
              if (err) {
                reject(err);
              }
              if (!data) data = '';
              data += '\nExecution Timed Out';
              console.log('Timed Out: ' + folder + ' ' + langName);
              fs.readFile(path + folder + '/errors', 'utf8', (err, errors) => {
                console.log(
                  '🚀 ~ file: docker-sandbox.ts:229 ~ DockerSandBox ~ fs.readFile ~ err:',
                  err,
                );

                console.log(
                  '🚀 ~ file: docker-sandbox.ts:234 ~ DockerSandBox ~ fs.readFile ~ errors:',
                  errors,
                );

                if (err) {
                  reject(err);
                }
                if (!errors) errors = '';
                const lines = data.toString().split('*---*');
                data = lines[0];
                const time = lines[1];
                console.log('Time: ', time);
                resolve({ data, errors });
              });
            });
          }
          //now remove the temporary directory
          console.log('ATTEMPTING TO REMOVE: ' + fullPath);
          console.log('------------------------------');
          // exec('rm -r ' + fullPath, (err, stdout, stderr) => {
          //   console.log(
          //     '🚀 ~ file: docker-sandbox.ts:228 ~ DockerSandBox ~ exec ~ stderr:',
          //     stderr,
          //   );
          //   if (err) {
          //     reject(stderr);
          //   }
          // });
          clearInterval(intid);
        });
      }, 1000);
    });
  }
}
