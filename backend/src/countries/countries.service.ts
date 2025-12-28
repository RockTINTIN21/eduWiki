import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountryDto, UpdateCountryDto } from './DTO/countries.dto';
import CountriesRepo from './countries.repo';

@Injectable()
export class CountriesService {
  constructor(private readonly repo: CountriesRepo) {}

  async findAll() {
    return this.repo.gelAllCounties();
  }

  async findOne(id: string) {
    return this.repo.getCountry(id);
  }

  async addCountry(dto: CreateCountryDto) {
    if (dto.information.currency_id) {
      console.log('dto:', dto)
      const res = await this.repo.getCurrency(dto.information.currency_id);
      console.log('res', res);
      if (!res) {
        throw new HttpException(
          'No currency found with this id',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const res = await this.repo.findByNameOrCountry(dto.name, dto.countryCode);
    if (res) {
      throw new HttpException(
        'Country with this name or code already exists',
        HttpStatus.CONFLICT,
      );
    }

    return this.repo.createCountry(dto);
  }

  async updateCountry(id: string, dto: UpdateCountryDto) {
    if (dto.information?.currency_id) {
      const res = await this.repo.getCurrency(dto.information.currency_id);
      if (!res) {
        throw new HttpException(
          'No currency found with this id',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const res = await this.repo.findByNameOrCountry(dto.name, dto.countryCode);
    if (res) {
      throw new HttpException(
        'Country with this name already exists',
        HttpStatus.CONFLICT,
      );
    }

    return this.repo.updateCountry(id, dto);
  }

  async deleteCountry(id: string) {
    return this.repo.deleteCountry(id);
  }
}
