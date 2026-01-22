import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import ms from 'ms';
import { OtpRepo } from './repo/otp.repo';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { GenerateEmailOtpDTO, VerifyEmailOtpDTO } from './otp.dto';
import { OtpType } from './repo/otp.repo.types';

@Injectable()
export class OtpService {
  constructor(
    private readonly repo: OtpRepo,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async generateEmailOTP(dto: GenerateEmailOtpDTO) {
    const user = await this.userService.findByEmail(dto.email);
    console.log('USER:', user);
    if (user && user.id && dto.type !== 'PASSWORD_RESET') {
      throw new BadRequestException({
        code: 'EMAIL_ALREADY_EXISTS',
        field: 'email',
      });
    }

    if (dto.type === 'PASSWORD_RESET' && !user.id) {
      console.log('EMAIL_NOT_EXISTS');
      throw new BadRequestException({
        code: 'EMAIL_NOT_EXISTS',
        field: 'email',
      });
    }

    const otp = await this.repo.getVerificationOTP({
      email: dto.email,
      type: dto.type,
    });

    if (otp) {
      await this.repo.deleteVerificationOTPById({ id: otp.id });
    }

    const length = 6;
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const code = randomInt(min, max).toString();
    const hashCode = await bcrypt.hash(code, 10);
    const ttl = this.configService.getOrThrow('OTP_EXPIRES_IN');
    const ttlMs = ms(ttl);
    const expirationTime = new Date(Date.now() + ttlMs);

    await this.repo.generateEmailOTP({
      type: dto.type,
      email: dto.email,
      hashedCode: hashCode,
      expirationTime,
    });

    return this.mailerService.sendMail({
      to: dto.email,
      subject: 'Код подтверждения',
      template: 'verification-code',
      context: {
        code,
        expiresIn: '15 минут',
      },
    });
  }

  async verifyEmailOTP(dto: VerifyEmailOtpDTO) {
    const otp = await this.repo.getVerificationOTP({
      email: dto.email,
      type: dto.type,
    });

    console.log('otp:', otp);
    if (!otp) {
      throw new BadRequestException({
        code: 'EMAIL_NOT_EXISTS',
        field: 'code',
      });
    }

    const isValid =
      (await bcrypt.compare(dto.code, otp.code)) &&
      !otp.isActivated &&
      otp.expirationTime > new Date();

    if (!isValid) {
      throw new BadRequestException({
        code: 'INVALID_CODE',
        field: 'code',
      });
    }

    await this.repo.updateStatusEmailOTP({
      id: otp.id,
      isActivated: true,
    });

    return isValid;
  }

  async getVerificationOTP(data: { email: string; type: OtpType }) {
    return this.repo.getVerificationOTP(data);
  }

  async deleteVerificationOTPById({ id }: { id: number }) {
    return this.repo.deleteVerificationOTPById({ id });
  }
}
