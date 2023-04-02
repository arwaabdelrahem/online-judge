import { InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';

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

      const execResult = await this.execute(
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
      console.log(
        '🚀 ~ file: docker-sandbox.ts:70 ~ DockerSandBox ~ run ~ execResult:',
        execResult,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async prepare(path, folder, file_name, code, langName, stdin_data) {
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
          console.log('EXEC stderr', stderr);
          reject(stderr);
        }

        fs.writeFile(path + folder + '/' + file_name, code, (err) => {
          if (err) {
            console.log('ERRORRR WRITE FILE', err);
            reject(err);
          } else {
            console.log(langName + ' file was saved!');
            exec("chmod 777 '" + path + folder + '/' + file_name + "'");

            fs.writeFile(path + folder + '/inputFile', stdin_data, (err) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                console.log('Input file was saved!');
                resolve('Input file was saved!');
              }
            });
          }
        });
      });
    });
  }

  async execute(
    path,
    folder,
    file_name,
    timeout_value,
    vm_name,
    compiler_name,
    output_command,
    extra_arguments,
    langName,
  ) {
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
    console.log('st', st);

    //execute the Docker, This is done ASYNCHRONOUSLY
    return new Promise((resolve, reject) => {
      exec(st);
      console.log('----------------------------------------------');
      //Check For File named "completed" after every 1 second
      const intid = setInterval(() => {
        //   Displaying the checking message after 1 second interval, testing purposes only
        console.log(
          'Checking ' + this.path + this.folder + ': for completion: ' + myC,
        );
        myC = myC + 1;
        fs.readFile(path + folder + '/completed', 'utf8', (err, data) => {
          console.log(
            '🚀 ~ file: docker-sandbox.ts:167 ~ DockerSandBox ~ fs.readFile ~ data:',
            data,
          );
          //if file is not available yet and the file interval is not yet up carry on
          if (err && myC < timeout_value) {
            console.log(
              '🚀 ~ file: docker-sandbox.ts:171 ~ DockerSandBox ~ fs.readFile ~ err:',
              err,
            );
            reject(err);
            return;
          }
          //if file is found simply display a message and proceed
          else if (myC < timeout_value) {
            console.log('DONE');
            //check for possible errors
            fs.readFile(path + folder + '/errors', 'utf8', (err, errorMsg) => {
              console.log(
                '🚀 ~ file: docker-sandbox.ts:182 ~ DockerSandBox ~ fs.readFile ~ errorMsg:',
                errorMsg,
              );
              if (err) {
                reject(err);
              }
              if (!errorMsg) errorMsg = '';
              console.log('Error file: ', errorMsg);
              console.log('Main File', data);
              const lines = data
                .toString()
                .split('*-COMPILEBOX::ENDOFOUTPUT-*');
              data = lines[0];
              const time = lines[1];
              console.log('Time: ', time);
              resolve({ data, time, errorMsg });
            });
            //return the data to the calling function
          }
          //if time is up. Save an error message to the data variable
          else {
            //Since the time is up, we take the partial output and return it.
            fs.readFile(path + folder + '/logfile.txt', 'utf8', (err, data) => {
              console.log(
                '🚀 ~ file: docker-sandbox.ts:203 ~ DockerSandBox ~ fs.readFile ~ data:',
                data,
              );
              if (err) {
                reject(err);
              }
              if (!data) data = '';
              data += '\nExecution Timed Out';
              console.log('Timed Out: ' + folder + ' ' + langName);
              fs.readFile(
                path + folder + '/errors',
                'utf8',
                (err, errorMsg) => {
                  if (err) {
                    reject(err);
                  }
                  if (!errorMsg) errorMsg = '';
                  const lines = data.toString().split('*---*');
                  data = lines[0];
                  const time = lines[1];
                  console.log('Time: ', time);
                  resolve({ data, errorMsg });
                },
              );
            });
          }
          //now remove the temporary directory
          console.log('ATTEMPTING TO REMOVE: ' + folder);
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
          // clearInterval(intid);
        });
      }, 1000);
    });
  }
}
