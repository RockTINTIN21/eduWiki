import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import CountriesRepo from './countries.repo';

@Module({
  imports: [AuthModule],
  controllers: [CountriesController],
  providers: [CountriesService, PrismaService, CountriesRepo],
  exports: [CountriesService, CountriesRepo],
})
export class CountriesModule {}
