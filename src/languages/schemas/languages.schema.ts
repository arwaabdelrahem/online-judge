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
export class Language {
  _id: string;
  @Prop({ type: String })
  compilerName: string;

  @Prop({ type: String })
  fileName: string;

  @Prop({ type: String, required: false })
  outputCommand?: string;

  @Prop({ type: String })
  languageName: string;

  @Prop({ type: String, required: false })
  extraArguments?: string;
}

export type LanguageDocument = Language & Document<string>;

export const LanguageSchema = SchemaFactory.createForClass(Language);
