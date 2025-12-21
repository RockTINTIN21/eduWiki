import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller.js';
import { CountriesService } from './countries.service.js';
import { PrismaService } from '../prisma.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [CountriesController],
  providers: [CountriesService, PrismaService],
})
export class CountriesModule {}
