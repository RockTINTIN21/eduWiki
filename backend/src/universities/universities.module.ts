import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { UniversitiesRepo } from './universities.repo';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UniversitiesController],
  providers: [UniversitiesService, UniversitiesRepo, PrismaService],
})
export class UniversitiesModule {}
