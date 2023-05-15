import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this._productsService.create(body);
  }

  @Patch('/:productId/quantity')
  async update(@Param('productId') productId: string) {
    return this._productsService.decrementQuantity(productId);
  }
}
