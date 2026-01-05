import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import CountriesRepo from './repo/countries.repo';
import { CountryBusinessRules } from './rules/country.business-rules';

@Module({
  imports: [AuthModule],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    PrismaService,
    CountriesRepo,
    CountryBusinessRules,
  ],
  exports: [CountriesService, CountryBusinessRules],
})
export class CountriesModule {}
