import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './DTO/users.dto.js';
import { UsersRepository } from './users.repository.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: string) {
    const res = await this.repo.findById(id);
    if (!res.length) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async findByUsername(username: string) {
    const res = await this.repo.findByUsername(username);
    if (!res.length) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async createUser(dto: CreateUserDTO) {
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

    return this.repo.createUser({
      ...dto,
      password: hashPassword,
      isActivated: false,
    });
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const res = await this.findById(id);
    if (res) {
      return this.repo.updateUser(id, dto);
    }
  }

  async deleteUser(id: string) {
    const res = await this.findById(id);
    if (res) {
      return this.repo.deleteUser(id);
    }
  }
}
