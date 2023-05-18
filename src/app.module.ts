import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envDevelopment from './common/config/env.development';
import envProduction from './common/config/env.production';
import { LanguagesModule } from './languages/languages.module';
import { ProblemsModule } from './problems/problems.module';
import { RealtimeModule } from './realtime/realtime.module';
import { ApacheKafkaModule } from './apache-kafka/apache-kafka.module';

const env = process.env.NODE_ENV;
const load = !env ? [envDevelopment] : [envProduction];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        uri: config.get('DB'),
        connectionFactory: (connection) => {
          return connection;
        },
      }),
    }),
    ProblemsModule,
    LanguagesModule,
    RealtimeModule,
    ApacheKafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
