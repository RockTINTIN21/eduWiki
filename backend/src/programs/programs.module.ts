import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service.js';
import { ProgramsController } from './programs.controller.js';
import { PrismaService } from '../prisma.service.js';
import { ProgramsRepo } from './programs.repo.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [ProgramsController],
  providers: [ProgramsService, PrismaService, ProgramsRepo],
})
export class ProgramsModule {}
