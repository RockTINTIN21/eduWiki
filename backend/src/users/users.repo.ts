import { PrismaService } from '../prisma.service';
import { UpdateUserDTO } from './DTO/users.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
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

  getUserRoles(id: string) {
    return this.prisma.userRoles.findMany({
      where: { userId: id },
      include: {
        role: {
          select: { name: true },
        },
      },
    });
  }
}
