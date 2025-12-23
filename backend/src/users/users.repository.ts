import { PrismaService } from '../prisma.service.js';
import { UpdateUserDTO } from './DTO/users.dto.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.$queryRawUnsafe(`SELECT * FROM users`);
  }

  async findById(id: string): Promise<[]> {
    return this.prisma.$queryRawUnsafe(`SELECT * FROM users WHERE id=$1`, id);
  }

  async findByUsername(username: string): Promise<[]> {
    return this.prisma.$queryRawUnsafe(
      `SELECT * FROM users WHERE username=$1`,
      username,
    );
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    if (dto.username) {
      await this.prisma.$executeRawUnsafe(
        `UPDATE users 
            SET username = $2
            WHERE id = $1
        `,
        id,
        dto.username,
      );
    }

    if (dto.email) {
      await this.prisma.$executeRawUnsafe(
        `UPDATE users 
            SET email = $2
            WHERE id = $1
        `,
        id,
        dto.email,
      );
    }

    if (dto.avatarUrl) {
      await this.prisma.$executeRawUnsafe(
        `UPDATE users 
            SET avatar_url = $2
            WHERE id = $1
        `,
        id,
        dto.avatarUrl,
      );
    }

    if (dto.isActivated) {
      await this.prisma.$executeRawUnsafe(
        `UPDATE users 
            SET is_activated = $2
            WHERE id = $1
        `,
        id,
        dto.isActivated,
      );
    }
  }

  async deleteUser(id: string) {
    await this.prisma.$executeRawUnsafe(`DELETE FROM users WHERE id = $1`, id);
  }
}
