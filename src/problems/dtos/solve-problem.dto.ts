import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SolveProblemDto {
  @ApiProperty()
  @IsNumber()
  // @IsString()
  languageId: number;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  stdin: string;
}
