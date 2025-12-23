import { Injectable } from '@nestjs/common';
import { CreateCountryDto, UpdateCountryDto } from './DTO/countries.dto.js';
import CountriesRepo from './countries.repo.js';

@Injectable()
export class CountriesService {
  constructor(private readonly repo: CountriesRepo) {}

  async findAll() {
    return this.repo.gelAllCounties();
  }

  async addCountry(dto: CreateCountryDto) {
    return this.repo.createCountry(dto);
  }

  async updateCountry(id: string, dto: UpdateCountryDto) {
    return this.repo.updateCountry(id, dto);
  }

  async deleteCountry(id: string) {
    return this.repo.deleteCountry(id);
  }
}
