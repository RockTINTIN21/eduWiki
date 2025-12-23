import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { TicketsController } from './tickets.controller.js';
import { PrismaService } from '../prisma.service.js';
import { TicketsRepository } from './tickets.repository.js';
import { AuthModule } from '../auth/auth.module.js';
import { CountriesService } from '../countries/countries.service.js';
import CountriesRepo from '../countries/countries.repo.js';
import { UniversitiesService } from '../universities/universities.service.js';
import { UniversitiesRepo } from '../universities/universities.repo.js';

@Module({
  imports: [AuthModule],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    TicketsRepository,
    PrismaService,
    CountriesService,
    CountriesRepo,
    UniversitiesService,
    UniversitiesRepo,
  ],
})
export class TicketsModule {}
