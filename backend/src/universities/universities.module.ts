import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service.js';
import { UniversitiesController } from './universities.controller.js';
import { UniversitiesRepo } from './universities.repo.js';
import { PrismaService } from '../prisma.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [UniversitiesController],
  providers: [UniversitiesService, UniversitiesRepo, PrismaService],
})
export class UniversitiesModule {}
