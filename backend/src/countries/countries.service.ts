import { Injectable } from '@nestjs/common';
import { CreateCountryDto, UpdateCountryDto } from './DTO/countries.dto';
import CountriesRepo from './repo/countries.repo';
import { CountryBusinessRules } from './rules/country.business-rules';

@Injectable()
export class CountriesService {
  constructor(
    private readonly repo: CountriesRepo,
    private readonly rules: CountryBusinessRules,
  ) {}

  async findAll() {
    return this.repo.gelAllCounties();
  }

  async findOne(id: string) {
    return this.repo.getCountry(id);
  }

  async createCountry({ dto }: { dto: CreateCountryDto }) {
    await this.rules.assertCreate({
      name: dto.name,
      countryCode: dto.countryCode,
      currencyCode: dto.information.currency,
    });

    return this.repo.createCountry(dto);
  }

  async updateCountry({ id, dto }: { id: string; dto: UpdateCountryDto }) {
    await this.rules.assertUpdate({
      id: id,
      name: dto.name,
      countryCode: dto.countryCode,
      currencyCode: dto.information?.currency,
    });

    return this.repo.updateCountry(id, dto);
  }

  async deleteCountry({ id }: { id: string }) {
    await this.rules.assertDelete({ id });
    return this.repo.deleteCountry(id);
  }
}
