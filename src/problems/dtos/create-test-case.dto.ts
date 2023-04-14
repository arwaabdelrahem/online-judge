import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTestCaseDto {
  @ApiProperty()
  @IsString()
  input: string;

  @ApiProperty()
  @IsString()
  output: string;
}
