import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RegisterDTO } from './DTO/auth.dto.js';

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

  createUser(dto: RegisterDTO): Promise<{ id: string }> {
    return this.prisma.$queryRawUnsafe(
      `INSERT INTO users (username, email, password, avatar_url) 
            VALUES ($1, $2, $3, $4) RETURNING id`,
      dto.username,
      dto.email,
      dto.password,
      dto.avatarUrl,
    );
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const res = await this.prisma.$queryRawUnsafe<{ username: string }[]>(
      'SELECT username FROM users WHERE username = $1',
      username,
    );

    return res.length > 0;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const res = await this.prisma.$queryRawUnsafe<{ username: string }[]>(
      `SELECT email
              FROM users
              WHERE email = $1`,
      email,
    );
    return res.length > 0;
  }
}
