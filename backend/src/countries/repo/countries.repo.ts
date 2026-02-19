import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateCountryRepoInput,
  UpdateCountryRepoInput,
} from './countries.repo.types';

@Injectable()
export default class CountriesRepo {
  constructor(private prisma: PrismaService) {}

  async findUniqueConflict(params: {
    id?: string;
    name?: string;
    countryCode?: string;
    currencyCode?: string;
  }) {
    const { name, countryCode, currencyCode, id } = params;

    if (id) return !!(await this.prisma.country.findUnique({ where: { id } }));

    if (name)
      return !!(await this.prisma.country.findUnique({ where: { name } }));

    if (countryCode)
      return !!(await this.prisma.country.findUnique({
        where: { countryCode },
      }));

    if (currencyCode)
      return !!(await this.prisma.currency.findUnique({
        where: { code: currencyCode },
      }));

    return false;
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

  async createCountry(data: CreateCountryRepoInput) {
    return this.prisma.country.create({
      data: {
        name: data.name,
        ruName: data.ruName,
        countryCode: data.countryCode,
        bgImage: data.bgImage,
        information: {
          create: {
            capital: data.information?.capital,
            currency: {
              connect: {
                code: data.information?.currencyCode,
              },
            },
            languages: data.information?.languages,
          },
        },
        requirements: {
          create: {
            ...data.requirements,
          },
        },
      },
    });
  }

  async updateCountry(id: string, data: UpdateCountryRepoInput) {
    return this.prisma.country.update({
      where: { id: id },
      data: {
        name: data.name,
        countryCode: data.countryCode,
        bgImage: data.bgImage,
        information: data.information
          ? {
              upsert: {
                update: {
                  capital: data.information.capital,
                  languages: data.information.languages,
                  currency: data.information.currencyCode
                    ? { connect: { code: data.information.currencyCode } }
                    : undefined,
                },
                create: {
                  capital: data.information.capital,
                  languages: data.information.languages,
                  currency: data.information.currencyCode
                    ? { connect: { code: data.information.currencyCode } }
                    : undefined,
                },
              },
            }
          : undefined,
        requirements: data.requirements
          ? {
              upsert: {
                update: {
                  ...data.requirements,
                },
                create: {
                  ...data.requirements,
                },
              },
            }
          : undefined,
      },
    });
  }

  async deleteCountry(id: string) {
    await this.prisma.country.delete({ where: { id } });
  }
}
