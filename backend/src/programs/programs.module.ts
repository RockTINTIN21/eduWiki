import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { PrismaService } from '../prisma.service';
import { ProgramsRepo } from './programs.repo';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProgramsController],
  providers: [ProgramsService, PrismaService, ProgramsRepo],
})
export class ProgramsModule {}
