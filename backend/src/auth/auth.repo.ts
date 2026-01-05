import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDTO } from './DTO/auth.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
  ): Promise<{ password: string; id: string } | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: { password: true, id: true },
    });
  }

  async createUser(dto: RegisterDTO): Promise<{ id: string }> {
    const data: Prisma.UserCreateInput = {
      username: dto.username,
      email: dto.email,
      password: dto.password,
    };

    const user = await this.prisma.user.create({ data });

    await this.prisma.userRoles.create({
      data: {
        userId: user.id,
        roleId: 1,
      },
    });

    return user;
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
}
