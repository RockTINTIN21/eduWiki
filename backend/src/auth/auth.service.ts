import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './DTO/auth.dto';
import { AuthRepo } from './auth.repo';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepo,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDTO) {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) {
      throw new HttpException(
        'Пользователь с такой почтой не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordIsMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordIsMatch) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.getTokens(user.username, user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async register(dto: RegisterDTO) {
    if (await this.repo.checkUsernameExists(dto.username)) {
      throw new HttpException(
        'Пользователь с таким ником уже существует',
        HttpStatus.CONFLICT,
      );
    }

    if (await this.repo.checkEmailExists(dto.email)) {
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        HttpStatus.CONFLICT,
      );
    }

    if (dto.passwordConfirm !== dto.password) {
      throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const res = await this.repo.createUser({
      ...dto,
      password: hashPassword,
    });
    const tokens = await this.getTokens(res.username, res.id);
    await this.updateRefreshToken(res.id, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.repo.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: string, username: string) {
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

    const payload = { sub: userId, username };

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
