import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDTO } from './DTO/users.dto';
import { UsersRepo } from './repo/users.repo';
import * as bcrypt from 'bcrypt';
import { CreateUserInputService } from './types/users.types';
import { GetUsersInput } from './types/users.types';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepo) {}

  async findAll({ page, limit, label, value }: GetUsersInput) {
    const allowed = ['createdAt', 'email', 'username', 'id', 'status', 'role'];

    if (label && value && !allowed.includes(label)) {
      throw new HttpException('Label doesnt have a correct type', 400);
    }

    if (label === 'id' && !isUUID(value)) {
      return {
        data: [],
        meta: {
          page: page,
          limit: limit,
          total: 0,
          totalPages: 0,
        },
      };
    }

    const [data, total] = await this.repo.findAll({
      page,
      limit,
      label,
      value,
    });

    return {
      data: data,
      meta: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / (limit ?? 25)),
      },
    };
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

  async updateUserPassword(data: { email: string; password: string }) {
    const res = await this.repo.findByEmail(data.email);
    const hashPassword = await bcrypt.hash(data.password, 10);
    if (res && res.id) {
      return await this.repo.updateUserPassword({
        id: res.id,
        password: hashPassword,
      });
    }
  }

  async createUser(data: CreateUserInputService) {
    if (await this.repo.checkUsernameExists(data.username)) {
      throw new BadRequestException({
        code: 'USERNAME_ALREADY_EXISTS',
        field: 'username',
      });
    }

    if (await this.repo.checkEmailExists(data.email)) {
      throw new BadRequestException({
        code: 'EMAIL_ALREADY_EXISTS',
        field: 'email',
      });
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    return this.repo.createUser({
      ...data,
      password: hashPassword,
      role: 'USER',
      avatarUrl: data.avatar ? `avatars/${data.avatar.filename}` : undefined,
    });
  }

  async deleteUser(id: string) {
    const res = await this.findById(id);
    if (res) {
      return this.repo.deleteUser(id);
    }
  }
}
