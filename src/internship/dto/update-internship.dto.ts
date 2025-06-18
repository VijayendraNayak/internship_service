import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateInternshipDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsNumber()
  duration?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  role?: string;
}