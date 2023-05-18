import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsRepo } from './repos/products.repo';

@Injectable()
export class ProductsService {
  constructor(private _productsRepo: ProductsRepo) {}

  async create(body: CreateProductDto) {
    const product = await this._productsRepo.create(body);

    return product;
  }

  async decrementQuantity(productId: string) {
    const product = await this._productsRepo.findOneAndUpdate(
      { _id: productId },
      { $inc: { quantity: -1 } },
      { new: true },
    );

    return product;
  }
}
