import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SolveProblemDto {
  @ApiProperty()
  // @IsNumber()
  @IsString()
  languageId: string;

  @ApiProperty()
  @IsString()
  code: string;

  // @ApiProperty()
  // @IsString()
  // stdin: string;
}
