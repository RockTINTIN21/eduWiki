import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CountriesRepo from '../repo/countries.repo';
import {
  AssertCreateArgs,
  AssertDeleteArgs,
  AssertUpdateArgs,
} from '../types/countries.business-rules.types';

@Injectable()
export class CountryBusinessRules {
  constructor(private readonly repo: CountriesRepo) {}

  async assertCreate({ name, countryCode, currencyCode }: AssertCreateArgs) {
    if (await this.repo.findUniqueConflict({ name })) {
      throw new HttpException(
        `Country with name ${name} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    if (await this.repo.findUniqueConflict({ countryCode })) {
      throw new HttpException(
        `Country with code ${countryCode} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    if (currencyCode) {
      const exist = await this.repo.findUniqueConflict({ currencyCode });
      if (!exist)
        throw new HttpException(
          `Currency with code ${currencyCode} not exists`,
          HttpStatus.CONFLICT,
        );
    }
  }

  async assertUpdate({
    id,
    name,
    countryCode,
    currencyCode,
  }: AssertUpdateArgs) {
    if (!(await this.repo.findUniqueConflict({ id }))) {
      throw new HttpException(
        `Country with id ${id} doesn't exists`,
        HttpStatus.CONFLICT,
      );
    }

    if (name) {
      const exist = await this.repo.findUniqueConflict({ name });
      if (exist)
        throw new HttpException(
          `Country with name ${name} already exists`,
          HttpStatus.CONFLICT,
        );
    }

    if (countryCode) {
      const exist = await this.repo.findUniqueConflict({ countryCode });
      if (exist)
        throw new HttpException(
          `Country with countryCode ${countryCode} already exists`,
          HttpStatus.CONFLICT,
        );
    }

    if (currencyCode) {
      const exist = await this.repo.findUniqueConflict({ currencyCode });
      if (!exist)
        throw new HttpException(
          `Currency with code ${currencyCode} not exists`,
          HttpStatus.CONFLICT,
        );
    }
  }

  async assertDelete({ id }: AssertDeleteArgs) {
    if (!(await this.repo.findUniqueConflict({ id }))) {
      throw new HttpException(
        `Country with id ${id} doesn't exists`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
