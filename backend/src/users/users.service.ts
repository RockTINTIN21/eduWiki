import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO } from './DTO/users.dto';
import { UsersRepo } from './repo/users.repo';
import * as bcrypt from 'bcrypt';
import { CreateUserInputService } from './types/users.types';
import { GetUsersInput } from './types/users.types';
import { isUUID } from 'class-validator';
import { ReviewEnum } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UsersRepo,
    private readonly jwtService: JwtService,
  ) {}

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
      throw new NotFoundException({
        code: 'NOT_FOUND',
      });
    }

    return res;
  }

  async getPublicProfile(username: string, token: string | undefined) {
    const user = await this.repo.getPublicProfile(username);

    const isOwner = (userId: string, token?: string) => {
      if (!token) return false;

      const decoded = this.jwtService.decode(token);

      if (!decoded) return false;

      return decoded.id === userId;
    };

    if (!user) {
      throw new NotFoundException({
        code: 'NOT_FOUND',
      });
    }

    const reviews = await this.repo.getUserReviews(user.id);

    const stats = {
      countReviews: reviews.length,
      countNeutral: reviews.filter(
        (review) => review.type === ReviewEnum.NEUTRAL,
      ).length,
      countNegative: reviews.filter(
        (review) => review.type === ReviewEnum.NEGATIVE,
      ).length,
      countPositive: reviews.filter(
        (review) => review.type === ReviewEnum.POSITIVE,
      ).length,
    };

    return {
      user: {
        ...user,
        stats: stats,
        isOwner: isOwner(user.id, token),
      },
      reviews,
    };
  }

  async findByEmail(email: string) {
    const res = await this.repo.findByEmail(email);
    if (!res) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      email: res.email,
      username: res.username,
      id: res.id,
      avatarUrl: res.avatarUrl,
    };
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

  async me(token: string) {
    const decoded = this.jwtService.decode(token);
    return this.findById(decoded.id);
  }
}
