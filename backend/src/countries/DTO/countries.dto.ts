import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CountryInformationDto {
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsOptional()
  @IsString()
  capital?: string;

  @IsOptional()
  @IsInt()
  population?: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

class CountryRequirementsDto {
  @IsOptional()
  @IsInt()
  minimalStudentVisaAge?: number;

  @IsOptional()
  @IsString()
  educationRequirements?: string;

  @IsOptional()
  @IsBoolean()
  nostrification?: boolean;

  @IsOptional()
  @IsInt()
  financialGuarantees?: number;
}

export class CreateCountryDto {
  @IsString()
  name: string;

  @IsString()
  ruName: string;

  @IsString()
  @Length(2, 2)
  countryCode: string;

  @IsString()
  bgImage: string;

  @IsOptional()
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => CountryInformationDto)
  information: CountryInformationDto;

  @ValidateNested()
  @Type(() => CountryRequirementsDto)
  requirements: CountryRequirementsDto;
}

export type UpdateCountryDto = Partial<CreateCountryDto>;
