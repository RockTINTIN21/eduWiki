import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './DTO/auth.dto.js';
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
    console.log('33333', user);
    if (!passwordIsMatch) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
      isActivated: false,
    });

    const payload = { id: res[0].id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
