import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SolveProblemDto {
  @ApiProperty()
  @IsString()
  languageId: string;

  @ApiProperty()
  @IsString()
  code: string;
}
