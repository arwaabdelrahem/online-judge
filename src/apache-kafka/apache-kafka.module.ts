import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaModule } from '@rob3000/nestjs-kafka';
import {
  KafkaClientsName,
  KafkaConsumersName,
  KafkaServicesName,
} from 'src/common/constants';
import { ApacheKafkaService } from './apache-kafka.service';

@Module({
  imports: [
    KafkaModule.registerAsync([KafkaServicesName.TEST_CASES_SERVICE], {
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return [
          {
            name: KafkaServicesName.TEST_CASES_SERVICE,
            options: {
              client: {
                clientId: KafkaClientsName.TEST_CASES,
                brokers: configService.get('kafka.brokers'),
              },
              consumer: {
                groupId: KafkaConsumersName.TEST_CASES_CONSUMER,
              },
            },
          },
        ];
      },
    }),
  ],
  providers: [ApacheKafkaService],
  exports: [ApacheKafkaService],
})
export class ApacheKafkaModule {}
