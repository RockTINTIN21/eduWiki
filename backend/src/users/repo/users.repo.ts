import { PrismaService } from '../../prisma.service';
import { UpdateUserDTO } from '../DTO/users.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserRepoInput, GetUsersRepoInput } from './users.repo.types';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<[GetUsersRepoInput[], number]> {
    console.log('PAGE:', page);
    console.log('LIMIT:', limit);
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          username: true,
          status: true,
          role: {
            select: { name: true },
          },
          createdAt: true,
        },
        orderBy: {
          username: 'desc',
        },
      }),
      this.prisma.user.count(),
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

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
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
