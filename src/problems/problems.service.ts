import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomBytes } from 'crypto';
import { EventsName } from 'src/common/constants';
import { LanguagesService } from 'src/languages/languages.service';
import { Language } from 'src/languages/schemas/languages.schema';
import { SocketGateway } from 'src/problems/socket.gateway';
import { RealtimeService } from 'src/realtime/realtime.service';
import { DockerSandBox } from './docker-sandbox';
import { CreateProblemDto } from './dtos/create-problem.dto';
import { SolveProblemDto } from './dtos/solve-problem.dto';
import { ProblemsRepo } from './repos/problems.repo';
import { Problem } from './schemas/problems.schema';

@Injectable()
export class ProblemsService {
  constructor(
    private _problemsRepo: ProblemsRepo,
    private _languagesService: LanguagesService,
    private _realtimeService: RealtimeService,
    private _gatewayService: SocketGateway,
    @Inject('PROBLEM_SERVICE') private client: ClientProxy,
  ) {}

  async create(createBody: CreateProblemDto) {
    const problem = await this._problemsRepo.create(createBody);

    return problem;
  }

  async findById(problemId: string) {
    console.log(
      '🚀 ~ file: problems.service.ts:34 ~ ProblemsService ~ findById ~ problemId:',
      problemId,
    );
    const problem = await this._problemsRepo.find({});
    console.log(
      '🚀 ~ file: problems.service.ts:35 ~ ProblemsService ~ findById ~ problem:',
      problem,
    );

    if (!problem) {
      throw new NotFoundException('problem not found');
    }

    return problem;
  }

  async solve(problemId: string, body: SolveProblemDto) {
    const { languageId, code } = body;

    // const problem = await this.findById(problemId);
    // const language = await this._languagesService.findById(languageId);

    // const problem = {
    //   content: 'CALC AREA',
    //   testCases: [
    //     { input: '3\n4.5', expectedOutput: '13.5\n15' },
    //     {
    //       input: '311.123\n499.997',
    //       expectedOutput: '155560.566631\n1622.24',
    //     },
    //   ],
    //   difficultyLevel: 'hard',
    //   points: 30,
    // };

    const problem = {
      content:
        "A line of code that prints 'Hello, World!' on a new line is provided in the editor.",
      testCases: [
        {
          input: '',
          expectedOutput: 'Hello, World!',
        },
      ],
      difficultyLevel: 'easy',
      points: 10,
    };

    const language = {
      compilerName: 'nodejs',
      fileName: 'file.js',
      outputCommand: '',
      languageName: 'Nodejs',
      extraArguments: '',
    };
    console.log(
      '🚀 ~ file: problems.service.ts:52 ~ ProblemsService ~ solve ~ language:',
      language,
    );

    const response = await this.sendMessage({ problem, language, code });

    return response;
  }

  private async validateUserCode(
    problem: Problem,
    language: Language,
    code: string,
  ) {
    const passedTestCases = [];

    const testCases = await Promise.all(
      problem.testCases.map(async (testCase) => {
        const stdin_data = testCase.input;

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

        const expectedOutput = testCase.expectedOutput
          .trim()
          .split('\n')
          .map(function (string) {
            return string.trim();
          });

        const input = testCase.input
          .trim()
          .split('\n')
          .map(function (string) {
            return string.trim();
          });

        if (!expectedOutput.every((val, index) => val === output[index])) {
          //failed test case
          passedTestCases.push(false);
          this._realtimeService.eventEmit(EventsName.FAILED_TEST_CASE, {
            message: 'test case failed',
            input,
            output,
            expectedOutput,
            errors,
          });
          this._gatewayService.socketEmitEvent(EventsName.FAILED_TEST_CASE, {
            message: 'test case failed',
            input,
            output,
            expectedOutput,
            errors,
          });
        } else {
          //passed test case
          passedTestCases.push(true);
          this._realtimeService.eventEmit(EventsName.PASSED_TEST_CASE, {
            message: 'test case passed',
            input,
            output,
            expectedOutput,
            errors,
          });
          this._gatewayService.socketEmitEvent(EventsName.PASSED_TEST_CASE, {
            message: 'test case passed',
            input,
            output,
            expectedOutput,
            errors,
          });
        }

        return {
          input,
          output,
          expectedOutput,
          // code,
          language: language.languageName,
          errors,
          time,
        };
      }),
    );

    if (passedTestCases.some((val) => val === false)) {
      return {
        message: 'wrong answer: test case failed',
        testCases,
      };
    } else {
      return {
        message: 'Success',
        testCases,
      };
    }
  }

  async sendMessage(data) {
    console.log(
      '🚀 ~ file: problems.service.ts:223 ~ ProblemsService ~ sendMessage ~ data:',
      data,
    );
    try {
      return this.client.send<number>({ cmd: 'problem' }, data);
    } catch (err) {
      console.log(err);
    }
  }

  private random(size: number) {
    //returns a crypto-safe random
    return randomBytes(size).toString('hex');
  }
}
