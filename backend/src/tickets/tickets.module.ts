import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaService } from '../prisma.service';
import { TicketsRepo } from './repo/tickets.repo';
import { AuthModule } from '../auth/auth.module';
import { CountriesModule } from '../countries/countries.module';
import { UniversitiesModule } from '../universities/universities.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, CountriesModule, UniversitiesModule, UsersModule],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsRepo, PrismaService],
})
export class TicketsModule {}
