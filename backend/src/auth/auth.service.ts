import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO, ResetPasswordDTO } from './DTO/auth.dto';
import { AuthRepo } from './repo/auth.repo';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { UsersService } from '../users/users.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepo,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
    private otpService: OtpService,
  ) {}

  async login(dto: LoginDTO) {
    const isEmail = dto.login.includes('@');

    const user = isEmail
      ? await this.repo.findByEmail(dto.login)
      : await this.repo.findByUsername(dto.login);

    if (!user || !user.password || !user.id) {
      throw new BadRequestException({
        code: 'INVALID_PASSWORD',
        field: 'password',
      });
    }

    const passwordIsMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordIsMatch) {
      throw new BadRequestException({
        code: 'INVALID_PASSWORD',
        field: 'password',
      });
    }

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { tokens, user };
  }

  async register(dto: RegisterDTO, avatar?: Express.Multer.File) {
    const otp = await this.otpService.getVerificationOTP({
      email: dto.email,
      type: 'REGISTRATION',
    });

    if (!otp || !otp.isActivated) {
      throw new BadRequestException({
        code: 'NOT_ACTIVATED_EMAIL',
        field: 'email',
      });
    }

    const user = await this.userService.createUser({
      ...dto,
      avatar: avatar,
    });

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.otpService.deleteVerificationOTPById({ id: otp.id });
    return tokens;
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const otp = await this.otpService.getVerificationOTP({
      email: dto.email,
      type: 'PASSWORD_RESET',
    });

    if (!otp || !otp.isActivated) {
      throw new BadRequestException({
        code: 'NOT_ACTIVATED_EMAIL',
        field: 'email',
      });
    }

    return this.userService.updateUserPassword({
      email: dto.email,
      password: dto.password,
    });
  }

  async logout(userId: string) {
    return this.repo.updateRefreshToken(userId, null);
  }

  async refreshAccessToken(userId: string, refreshToken: string) {
    const user = await this.repo.findUserInfoByUserId(userId);
    if (!user) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken as string,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.getTokens(userId);

    await this.updateRefreshToken(userId, tokens.refreshToken);
    return {
      tokens: {
        ...tokens,
      },
      user: {
        id: user.id,
        role: user.role.name,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async checkUniqUsername(username: string) {
    const user = await this.repo.findByUsername(username);
    return {
      available: !user.id,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.repo.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: string) {
    const accessSecret =
      this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');
    const refreshSecret =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');

    const accessExpiresIn = this.configService.getOrThrow<StringValue>(
      'JWT_ACCESS_EXPIRES_IN',
    );
    const refreshExpiresIn = this.configService.getOrThrow<StringValue>(
      'JWT_REFRESH_EXPIRATION',
    );

    const payload = { id: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
        expiresIn: accessExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
