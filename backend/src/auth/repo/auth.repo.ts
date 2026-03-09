import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const res = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        password: true,
        role: {
          select: { name: true },
        },
      },
    });
    return {
      ...res,
      role: res?.role.name,
    };
  }

  async findByUsername(username: string) {
    const res = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        password: true,
        role: {
          select: { name: true },
        },
      },
    });
    return {
      ...res,
      role: res?.role.name,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    await this.prisma.user.update({
      data: {
        refreshToken,
      },
      where: {
        id,
      },
    });
  }

  async findUserInfoByUserId(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        refreshToken: true,
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        role: {
          select: { name: true },
        },
      },
    });
  }


}
