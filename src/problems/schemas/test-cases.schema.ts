import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class TestCase {
  @Prop({ type: String })
  input: string;

  @Prop({ type: String })
  expectedOutput: string;
}

export const TestCaseSchema = SchemaFactory.createForClass(TestCase);
