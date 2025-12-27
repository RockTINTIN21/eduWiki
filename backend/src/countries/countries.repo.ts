import { PrismaService } from '../prisma.service';
import { CreateCountryDto, UpdateCountryDto } from './DTO/countries.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CountriesRepo {
  constructor(private prisma: PrismaService) {}

  gelAllCounties() {
    return this.prisma.$queryRawUnsafe(`
      SELECT *
      FROM country
      JOIN country_requirements
        ON country.id = country_requirements.country_id
      JOIN country_information
        ON country.id = country_information.country_id
    `);

  }

  async getCountry(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id: id },
    });
    console.log('country', country);
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

  async updateCountry(id: string, dto: UpdateCountryDto) {
    if (dto.bgImage || dto.countryCode || dto.name) {
      if (dto.bgImage)
        console.log('выполняю обновление BG', dto.bgImage, 'id:', id);
      await this.prisma.$executeRawUnsafe(
        `
          UPDATE country SET bg_image = $1 WHERE id = $2
        `,
        dto.bgImage,
        id,
      );

      if (dto.countryCode)
        await this.prisma.$executeRawUnsafe(
          `
          UPDATE country SET country_code = $1 WHERE id = $2
        `,
          dto.countryCode,
          id,
        );

      if (dto.name)
        await this.prisma.$executeRawUnsafe(
          `
          UPDATE country SET name = $1 WHERE id = $2
        `,
          dto.name,
          id,
        );

      if (dto.information) {
        if (dto.information.population)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_information SET population = $1 WHERE country_id = $2`,
            dto.information.population,
            id,
          );

        if (dto.information.capital)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_information SET capital = $1 WHERE country_id = $2`,
            dto.information.capital,
            id,
          );

        if (dto.information.languages)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_information SET languages = $1 WHERE country_id = $2`,
            dto.information.languages,
            id,
          );

        if (dto.information.currency_id)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_information SET currency_id = $1 WHERE country_id = $2`,
            dto.information.currency_id,
            id,
          );
      }

      if (dto.requirements) {
        if (dto.requirements.nostrification)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_requirements SET nostrification = $1 WHERE country_id = $2`,
            dto.requirements.nostrification,
            id,
          );

        if (dto.requirements.educationRequirements)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_requirements SET education_requirements = $1 WHERE country_id = $2`,
            dto.requirements.educationRequirements,
            id,
          );

        if (dto.requirements.minimalStudentVisaAge)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_requirements SET minimal_student_visa_age = $1 WHERE country_id = $2`,
            dto.requirements.minimalStudentVisaAge,
            id,
          );

        if (dto.requirements.financialGuarantees)
          await this.prisma.$executeRawUnsafe(
            `UPDATE country_requirements SET financial_guarantees = $1 WHERE country_id = $2`,
            dto.requirements.financialGuarantees,
            id,
          );
      }
    }
  }

  async deleteCountry(id: string) {
    await this.prisma.$executeRawUnsafe(
      `DELETE FROM country WHERE id = $1`,
      id,
    );
  }
}
