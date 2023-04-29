import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DifficultyLevel } from 'src/common/constants';
import { TestCase, TestCaseSchema } from './test-cases.schema';

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
export class Problem {
  _id: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  input?: string;

  @Prop({ type: String })
  output?: string;

  @Prop({ type: [TestCaseSchema] })
  testCases?: TestCase[];

  @Prop({ type: String, enum: DifficultyLevel })
  difficultyLevel: DifficultyLevel;

  @Prop({ type: Number })
  points: number;
}

export type ProblemDocument = Problem & Document<string>;

export const ProblemSchema = SchemaFactory.createForClass(Problem);
