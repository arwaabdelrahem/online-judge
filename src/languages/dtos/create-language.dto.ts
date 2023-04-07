import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLanguageDto {
  // First column contains the compiler/interpretor that will be used for translation
  // Second column is the file name to use when storing the source code
  // Third column is optional, it contains the command to invoke the compiled program, it is used only for compilers
  // Fourth column is just the language name for display on console, for verbose error messages
  // Fifth column is optional, it contains additional arguments/flags for compilers

  @ApiProperty()
  @IsString()
  compilerName: string;

  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  outputCommand?: string;

  @ApiProperty()
  @IsString()
  languageName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  extraArguments?: string;
}
