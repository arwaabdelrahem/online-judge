import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemsModule } from './problems/problems.module';
import { LanguagesModule } from './languages/languages.module';
import envDevelopment from './common/config/env.development';
import envProduction from './common/config/env.production';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
