import { PrismaService } from '../prisma.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UniversitiesRepo {
  constructor(private readonly prisma: PrismaService) {}

}
