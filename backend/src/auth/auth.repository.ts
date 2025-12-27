import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RegisterDTO } from './DTO/auth.dto.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
  ): Promise<{ password: string; id: string } | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { password: true, id: true },
    });
  }

  createUser(dto: RegisterDTO): Promise<{ id: string }> {
    const data: Prisma.UserCreateInput = {
      username: dto.username,
      email: dto.email,
      password: dto.password,
      avatarUrl: dto.avatarUrl,
    };

    return this.prisma.user.create({
      data,
    });
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: { username },
      select: { username: true },
    });

    return !!res;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    return !!res;
  }
}
