import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { LanguagesModule } from 'src/languages/languages.module';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { SocketGateway } from 'src/problems/socket.gateway';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { ProblemsRepo } from './repos/problems.repo';
import { ProblemSchema } from './schemas/problems.schema';

@Module({
  imports: [
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
    RealtimeModule,
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService, ProblemsRepo, SocketGateway],
})
export class ProblemsModule {}
