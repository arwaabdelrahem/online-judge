import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import envDevelopment from 'src/common/config/env.development';
import envProduction from 'src/common/config/env.production';
import { ProductsModule } from 'src/products/products.module';
import { ChangeStreamService } from './change-stream.service';

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
    ProductsModule,
  ],
  providers: [ChangeStreamService],
})
export class ChangeStreamModule {}
