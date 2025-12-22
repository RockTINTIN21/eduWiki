import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { TicketsController } from './tickets.controller.js';
import { PrismaService } from '../prisma.service.js';
import { TicketsRepository } from './tickets.repository.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsRepository, PrismaService],
})
export class TicketsModule {}
