import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DificultyLevel } from 'src/common/constants';
import { CreateTestCaseDto } from './create-test-case.dto';
import { Type } from 'class-transformer';

export class CreateProblemDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  input: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  output: string;

  @ApiPropertyOptional({ type: [CreateTestCaseDto] })
  @Type(() => CreateTestCaseDto)
  @IsOptional()
  testCases?: CreateTestCaseDto[];

  @ApiProperty({ enum: DificultyLevel })
  @IsString()
  @IsEnum(DificultyLevel)
  dificultyLevel: DificultyLevel;

  @ApiProperty()
  @IsNumber()
  points: number;
}
