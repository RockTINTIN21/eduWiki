import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
  ): Promise<{ password: string; id: string } | null> {
    const res = await this.prisma.$queryRawUnsafe<
      { password: string; id: string }[]
    >(
      `SELECT password
       FROM users
       WHERE email = $1
       LIMIT 1`,
      email,
    );

    return res[0] ?? null;
  }
}
