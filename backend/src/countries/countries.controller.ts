import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service.js';
import { CreateCountryDto } from './DTO/countries.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  addCountry(@Body() dto: CreateCountryDto) {
    return this.countriesService.addCountry(dto);
  }
}
