import { Inject, Injectable } from '@nestjs/common';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { RecordMetadata } from 'kafkajs';
import { KafkaServicesName, KafkaTopicsName } from 'src/common/constants';

@Injectable()
export class ApacheKafkaService {
  constructor(
    @Inject(KafkaServicesName.TEST_CASES_SERVICE) private client: KafkaService,
  ) {}

  @SubscribeTo(KafkaTopicsName.TEST_CASES_TOPIC)
  async consume(
    data: any,
    key: any,
    offset: number,
    timestamp: number,
    partition: number,
    headers: IHeaders,
  ): Promise<void> {
    console.log(
      '🚀 ~ file: problems.service.ts:39 ~ ProblemsService ~ headers:',
      headers,
    );
    console.log(
      '🚀 ~ file: problems.service.ts:39 ~ ProblemsService ~ partition:',
      partition,
    );
    console.log(
      '🚀 ~ file: problems.service.ts:39 ~ ProblemsService ~ key:',
      key,
    );
    console.log(
      '🚀 ~ file: problems.service.ts:39 ~ ProblemsService ~ data:',
      data,
    );
  }

  async publish(topic: string, message: string): Promise<RecordMetadata[]> {
    const result = await this.client.send({
      topic,
      messages: [
        {
          key: '1',
          value: message,
        },
      ],
    });

    return result;
  }
}
