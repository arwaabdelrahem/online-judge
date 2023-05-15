import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseModelNames } from 'src/common/constants';
import { BaseRepo } from 'src/common/utils/base.repo';
import { Product, ProductDocument } from '../schemas/products.schema';

export class ProductsRepo extends BaseRepo<Product> {
  constructor(
    @InjectModel(DatabaseModelNames.PRODUCT_MODEL)
    private _productsModel: Model<ProductDocument>,
  ) {
    super(_productsModel);
  }
}
