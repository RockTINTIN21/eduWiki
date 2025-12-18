import { Body, Controller, Get, Post } from '@nestjs/common';
import { CountriesService } from './countries.service.js';
import { CreateCountriesDto } from './DTO/countries.dto.js';


@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Post('/add')
  addCountry(@Body() dto: CreateCountriesDto){
    return this.countriesService.addCountry(dto);
  }
}
