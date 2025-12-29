import { PrismaService } from '../prisma.service';
import { CreateCountryDto, UpdateCountryDto } from './DTO/countries.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CountriesRepo {
  constructor(private prisma: PrismaService) {}

  async getCurrency(id: number) {
    return this.prisma.currency.findUnique({
      where: { id: id },
    });
  }

  async findByNameOrCountry(name?: string, countryCode?: string) {
    return this.prisma.country.findUnique({ where: { name, countryCode } });
  }

  gelAllCounties() {
    return this.prisma.country.findMany({
      include: {
        information: true,
        requirements: true,
      },
    });
  }

  async getCountry(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id: id },
    });

    const information = await this.prisma.countryInformation.findUnique({
      where: { countryId: id },
    });

    const requirements = await this.prisma.countryRequirements.findUnique({
      where: { countryId: id },
    });

    return {
      ...country,
      information: information,
      requirements: requirements,
    };
  }

  async createCountry(dto: CreateCountryDto) {
    return this.prisma.country.create({
      data: {
        name: dto.name,
        countryCode: dto.countryCode,
        bgImage: dto.bgImage,
        information: {
          create: {
            capital: dto.information.capital,
            population: dto.information.population,
            currencyId: dto.information.currency_id,
          },
        },
        requirements: {
          create: {
            minimalStudentVisaAge: dto.requirements.minimalStudentVisaAge,
            nostrification: dto.requirements.nostrification,
            financialGuarantees: dto.requirements.financialGuarantees,
          },
        },
      },
    });
  }

  async updateCountry(id: string, dto: UpdateCountryDto) {
    return this.prisma.country.update({
      where: { id: id },
      data: {
        name: dto.name,
        countryCode: dto.countryCode,
        bgImage: dto.bgImage,
        information: {
          update: {
            capital: dto.information?.capital,
            population: dto.information?.population,
            currencyId: dto.information?.currency_id,
          },
        },
        requirements: {
          update: {
            minimalStudentVisaAge: dto.requirements?.minimalStudentVisaAge,
            nostrification: dto.requirements?.nostrification,
            financialGuarantees: dto.requirements?.financialGuarantees,
          },
        },
      },
    });
  }

  async deleteCountry(id: string) {
    console.log('id:', id)
    await this.prisma.country.delete({ where: { id } });
  }
}
