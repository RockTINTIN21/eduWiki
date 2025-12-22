import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateCountryDto } from './DTO/countries.dto.js';

@Injectable()
export class CountriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    // return this.prisma.country.findMany();
    // const res = await this.prisma.$queryRaw`SELECT * FROM country
    // JOIN country_requirements ON country.id = country.id
    // JOIN country_information ON country.id = country.id`;

    const res = await this.prisma.$queryRawUnsafe(`
      SELECT *
      FROM country
      JOIN country_requirements
        ON country.id = country_requirements.country_id
      JOIN country_information
        ON country.id = country_information.country_id
      JOIN currency
        ON country_information.currency_id = currency.id
`);

    console.log(res);
    return res;
  }

  async addCountry(dto: CreateCountryDto) {
    // return this.prisma.country.create({
    //   data: dto,
    // });
    console.log('DTO:', dto);
    const country = await this.prisma.$queryRawUnsafe<{ id: number }[]>(
      `
      INSERT INTO country(name, country_code, bg_image)
      VALUES ($1, $2, $3) RETURNING id;
      `,
      dto.name,
      dto.countryCode,
      dto.bgImage,
    );

    const countryId = country[0].id;

    await this.prisma.$queryRawUnsafe(
      `
      INSERT INTO country_information(languages, capital, population, currency_id, country_id)
      VALUES ($1, $2,
              $3, $4, $5);
      `,
      dto.information.languages,
      dto.information.capital,
      dto.information.population,
      dto.information.currency_id,
      countryId,
    );

    await this.prisma.$queryRawUnsafe(
      `
        INSERT INTO country_requirements(
          minimal_student_visa_age, education_requirements, nostrification,
          financial_guarantees, country_id
        )
        VALUES ($1, $2, $3, $4, $5);
      `,
      dto.requirements.minimalStudentVisaAge,
      dto.requirements.educationRequirements,
      dto.requirements.nostrification,
      dto.requirements.financialGuarantees,
      countryId,
    );
  }
}
