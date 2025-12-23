import { PrismaService } from '../prisma.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgramsRepo {
  constructor(private readonly prisma: PrismaService) {}


}