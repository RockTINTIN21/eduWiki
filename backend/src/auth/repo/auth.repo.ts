import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateVerificationCodeRepoInput } from './auth.repo.types';

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
        refreshToken: true,
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
        refreshToken: true,
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
        role: true,
      },
    });
  }

  async generateEmailOTP(data: CreateVerificationCodeRepoInput) {
    return this.prisma.verificationCode.create({
      data: {
        email: data.email,
        code: data.hashedCode,
        expirationTime: data.expirationTime,
      },
    });
  }

  async getVerificationOTP(data: { email: string }) {
    return this.prisma.verificationCode.findUnique({
      where: {
        email: data.email,
      },
    });
  }

  async deleteVerificationOTPById(data: { id: number }) {
    return this.prisma.verificationCode.delete({
      where: { id: data.id },
    });
  }

  async updateStatusEmailOTP(data: { id: number; isActivated: boolean }) {
    return this.prisma.verificationCode.update({
      where: { id: data.id },
      data: {
        isActivated: data.isActivated,
      },
    });
  }
}
