import { Injectable } from '@nestjs/common';
import { CreateVerificationCodeRepoInput, OtpType } from './otp.repo.types';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class OtpRepo {
  constructor(private readonly prisma: PrismaService) {}
  async generateEmailOTP(data: CreateVerificationCodeRepoInput) {
    return this.prisma.verificationCode.create({
      data: {
        email: data.email,
        code: data.hashedCode,
        expirationTime: data.expirationTime,
        type: data.type,
      },
    });
  }

  async getVerificationOTP(data: { email: string; type: OtpType }) {
    return this.prisma.verificationCode.findUnique({
      where: {
        email: data.email,
        type: data.type,
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
