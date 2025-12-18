import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateCountriesDto } from './DTO/countries.dto.js';

@Injectable()
export class CountriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.country.findMany();
  }

  addCountry(dto: CreateCountriesDto) {
    return this.prisma.country.create({
      data: dto,
    });
  }
}
