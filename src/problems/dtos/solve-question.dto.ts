import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SolveQuestionDto {
  @ApiProperty()
  @IsNumber()
  languageId: number;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  stdin: string;
}
