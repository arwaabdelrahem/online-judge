import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Product {
  _id?: string;
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  quantity: number;
}

export type ProductDocument = Product & Document<string>;

export const ProductSchema = SchemaFactory.createForClass(Product);
