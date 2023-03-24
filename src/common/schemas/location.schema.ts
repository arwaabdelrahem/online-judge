import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: false,
  toJSON: {
    transform: (doc, ret) => {
      ret['longitude'] = ret.coordinates[0];
      ret['latitude'] = ret.coordinates[1];
      delete ret.coordinates;
      delete ret.type;
      delete ret.deleted;
    },
  },
})
export class Location {
  @Prop({ type: String, default: 'Point' })
  type: string;

  @Prop({ type: [Number], index: '2dsphere' })
  coordinates: number[];
}

const locationSchema = SchemaFactory.createForClass(Location);
