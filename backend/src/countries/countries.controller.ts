import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './DTO/countries.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  addCountry(@Body() dto: CreateCountryDto) {
    return this.countriesService.addCountry(dto);
  }

  @Delete('/delete/:id')
  deleteCountry(@Param('id') id: string) {
    return this.countriesService.deleteCountry(id);
  }
}
