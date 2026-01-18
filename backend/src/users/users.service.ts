import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDTO } from './DTO/users.dto';
import { UsersRepo } from './repo/users.repo';
import { RegisterDTO } from '../auth/DTO/auth.dto';
import { CreateUserRepoInput } from './repo/users.repo.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepo) {}

  findAll() {
    return this.repo.findAll();
  }

  // async getUserRoles(id: string) {
  //   return this.repo.getUserRoles(id);
  // }

  async findById(id: string) {
    const res = await this.repo.findById(id);
    if (!res) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async findByUsername(username: string) {
    const res = await this.repo.findByUsername(username);
    if (!res) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async findByEmail(email: string) {
    const res = await this.repo.findByEmail(email);
    if (!res) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const res = await this.findById(id);
    if (res) {
      return this.repo.updateUser(id, dto);
    }
  }

  async createUser(dto: RegisterDTO) {
    if (await this.repo.checkUsernameExists(dto.username)) {
      throw new BadRequestException({
        code: 'USERNAME_ALREADY_EXISTS',
        field: 'username',
      });
    }

    if (await this.repo.checkEmailExists(dto.email)) {
      throw new BadRequestException({
        code: 'EMAIL_ALREADY_EXISTS',
        field: 'email',
      });
    }
    if (dto.passwordConfirm !== dto.password) {
      throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const data: CreateUserRepoInput = {
      ...dto,
      password: hashPassword,
      role: 'USER',
    };

    return this.repo.createUser(data);
  }

  async deleteUser(id: string) {
    const res = await this.findById(id);
    if (res) {
      return this.repo.deleteUser(id);
    }
  }
}
