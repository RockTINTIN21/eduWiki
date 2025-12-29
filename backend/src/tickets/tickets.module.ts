import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaService } from '../prisma.service';
import { TicketsRepo } from './tickets.repo';
import { AuthModule } from '../auth/auth.module';
import { CountriesService } from '../countries/countries.service';
import CountriesRepo from '../countries/countries.repo';
import { UniversitiesService } from '../universities/universities.service';
import { UniversitiesRepo } from '../universities/universities.repo';
import { UsersRepo } from '../users/users.repo';

@Module({
  imports: [AuthModule],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    TicketsRepo,
    PrismaService,
    CountriesService,
    CountriesRepo,
    UniversitiesService,
    UniversitiesRepo,
    UsersRepo
  ],
})
export class TicketsModule {}
