import { IsString } from 'class-validator';

export class CreateCountriesDto {
  @IsString()
  name: string;

  @IsString()
  countryCode: string;

  @IsString()
  bgImage: string;
}

export type TUpdateCountriesDto = Partial<CreateCountriesDto>;
