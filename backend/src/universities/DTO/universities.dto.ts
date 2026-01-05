import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UniversityInformation {
  @IsOptional()
  @IsUUID()
  universityID: string;

  @IsOptional()
  @IsNumber()
  top: number;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsNumber()
  students: number;

  @IsOptional()
  @IsNumber()
  yearOfFoundation: number;
}

export class UniversityRequirements {
  @IsOptional()
  @IsUUID()
  universityID: string;

  @IsOptional()
  @IsArray()
  documents: string[];

  @IsOptional()
  @IsString()
  languageLevel: string;

  @IsOptional()
  @IsDate()
  deadline: Date;
}

export class CreateUniversityDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  countryId: string;

  @IsOptional()
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => UniversityInformation)
  information: UniversityInformation;

  @ValidateNested()
  @Type(() => UniversityRequirements)
  requirements: UniversityRequirements;

  @IsOptional()
  @IsUUID()
  createdBy: string;

  @IsOptional()
  @IsString()
  bgImage: string;
}

export type UpdateUniversityDTO = Partial<CreateUniversityDTO>;
