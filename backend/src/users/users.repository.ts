import { PrismaService } from '../prisma.service.js';
import { CreateUserDTO, UpdateUserDTO } from './DTO/users.dto.js';
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

  createUser(dto: CreateUserDTO) {
    return this.prisma.$executeRawUnsafe(
      `INSERT INTO users (username, email, password, avatar_url) 
            VALUES ($1, $2, $3, $4)`,
      dto.username,
      dto.email,
      dto.password,
      dto.avatarUrl,
    );
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const res = await this.prisma.$queryRawUnsafe<{ username: string }[]>(
      'SELECT username FROM users WHERE username = $1',
      username,
    );

    return res.length > 0;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const res = await this.prisma.$queryRawUnsafe<{ username: string }[]>(
      `SELECT email
              FROM users
              WHERE email = $1`,
      email,
    );
    return res.length > 0;
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    // Захардкодил по причине того, что не знаю как это сделать через цикл т.к. может быть столбец где название
    // идёт через нижнее подчеркивание и это слишком муторно для MVP и практики

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
