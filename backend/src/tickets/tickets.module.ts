import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaService } from '../prisma.service';
import { TicketsRepository } from './tickets.repository';
import { AuthModule } from '../auth/auth.module';
import { CountriesService } from '../countries/countries.service';
import CountriesRepo from '../countries/countries.repo';
import { UniversitiesService } from '../universities/universities.service';
import { UniversitiesRepo } from '../universities/universities.repo';

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
