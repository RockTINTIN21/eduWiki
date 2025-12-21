import { Module } from '@nestjs/common';
import { EditRequestsService } from './edit-requests.service.js';
import { EditRequestsController } from './edit-requests.controller.js';
import { PrismaService } from '../prisma.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { EditRequestsRepository } from './edit-requests.repository.js';

@Module({
  imports: [AuthModule],
  controllers: [EditRequestsController],
  providers: [EditRequestsService, EditRequestsRepository, PrismaService],
})
export class EditRequestsModule {}
