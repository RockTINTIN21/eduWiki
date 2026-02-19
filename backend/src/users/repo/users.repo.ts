import { PrismaService } from '../../prisma.service';
import { UpdateUserDTO } from '../DTO/users.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserRepoInput, GetUsersRepoInput } from './users.repo.types';
import { GetUsersInput, SearchLabelsTypes } from '../types/users.types';
import { UserStatusEnum } from '@prisma/client';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: GetUsersInput): Promise<[GetUsersRepoInput[], number]> {
    const { limit, page, value, label } = params;

    const searchParam = (label: SearchLabelsTypes, value: string) => {
      switch (label) {
        case 'createdAt': {
          const date = new Date(value);
          date.setUTCHours(0, 0, 0, 0);
          const nextDate = new Date(value);
          nextDate.setDate(date.getDate() + 1);
          return {
            createdAt: {
              gte: date.toISOString(),
              lte: nextDate.toISOString(),
            },
          };
        }
        case 'status':
          return { status: value as UserStatusEnum };
        case 'role':
          return { role: { name: value } };
        case 'id':
          return { id: value };
        default:
          return {
            [label]: {
              contains: value,
              mode: 'insensitive',
            },
          };
      }
    };

    const where = label && value ? searchParam(label, value) : undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: ((page ?? 1) - 1) * (limit ?? 25),
        take: limit,
        where,
        orderBy: { username: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          status: true,
          role: { select: { name: true } },
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const users = data.map((user) => ({
      ...user,
      role: user.role.name,
    }));

    return [users, total];
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        refreshToken: true,
        role: {
          select: { name: true },
        },
      },
    });
  }

  async findByUsername(value: string) {
    return this.prisma.user.findFirst({
      where: {
        username: {
          equals: value,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        refreshToken: true,
        password: true,
        role: {
          select: { name: true },
        },
      },
    });
  }

  async getPublicProfile(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
      },
    });

    const reviews = await this.prisma.review.findMany({
      where: { userId: user?.id },
      select: {
        type: true,
        text: true,
        likes: true,
        dislikes: true,
        createdAt: true,
        id: true,
        userId: true,
        country: { select: { name: true, ruName: true } },
        university: { select: { name: true } },
      },
    });

    const formattedReviews = reviews.map((review) => ({
      ...review,
      ...(review.university && { university: review.university.name }),
    }));

    return {
      user,
      reviews: formattedReviews,
    };
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: { username },
      select: { username: true },
    });

    return !!res;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const res = await this.prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    return !!res;
  }

  async findByEmail(email: string) {
    const res = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        refreshToken: true,
        password: true,
        role: {
          select: { name: true },
        },
      },
    });
    return {
      ...res,
      role: res?.role.name,
    };
  }

  async createUser(data: CreateUserRepoInput) {
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl,
        role: {
          connect: {
            name: data.role,
          },
        },
      },
    });
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: {
        username: dto.username,
        email: dto.email,
        avatarUrl: dto.avatarUrl,
      },
    });
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  async updateUserPassword(data: { id: string; password: string }) {
    await this.prisma.user.update({
      where: { id: data.id },
      data: { password: data.password },
    });
  }

  // getUserRoles(id: string) {
  //   return this.prisma.userRoles.findMany({
  //     where: { userId: id },
  //     include: {
  //       role: {
  //         select: { name: true },
  //       },
  //     },
  //   });
  // }
}
