import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { ProductSchema } from './schemas/products.schema';
import { ProductsRepo } from './repos/products.repo';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DatabaseModelNames.PRODUCT_MODEL,
        useFactory: () => {
          const schema = ProductSchema;

          return schema;
        },
      },
    ]),
  ],
  providers: [ProductsService, ProductsRepo],
  controllers: [ProductsController],
  exports: [ProductsService, ProductsRepo],
})
export class ProductsModule {}
