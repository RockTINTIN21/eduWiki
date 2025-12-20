import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from './DTO/auth.dto.js';
import { AuthRepository } from './auth.repository.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private readonly jwtService: JwtService,
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
    console.log(passwordIsMatch);
    if (!passwordIsMatch) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
