import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModelNames, QueuesName } from 'src/common/constants';
import { LanguagesModule } from 'src/languages/languages.module';
import { SocketGateway } from 'src/problems/socket.gateway';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { ProblemsRepo } from './repos/problems.repo';
import { ProblemSchema } from './schemas/problems.schema';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PROBLEM_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              'amqps://cdepyhys:Rs8ld5zpCFA8v3CDu91F8bUG2NuFARr0@shark.rmq.cloudamqp.com/cdepyhys',
            ],
            queue: QueuesName.PROBLEMS_QUEUE,
          },
        }),
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: DatabaseModelNames.PROBLEM_MODEL,
        useFactory: () => {
          const schema = ProblemSchema;

          return schema;
        },
      },
    ]),
    LanguagesModule,
    // RealtimeModule,
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService, ProblemsRepo, SocketGateway],
})
export class ProblemsModule {}
