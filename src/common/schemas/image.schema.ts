import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class Image {
  @Prop({ type: String })
  original?: string;

  @Prop({ type: String })
  thumbnail?: string;
}
