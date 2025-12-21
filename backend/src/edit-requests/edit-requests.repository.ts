import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class EditRequestsRepository {
  constructor(private readonly prisma: PrismaService) {}

}