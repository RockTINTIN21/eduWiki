import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './DTO/users.dto';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepo) {}

  findAll() {
    return this.repo.findAll();
  }

  async getUserRoles(id: string) {
    return this.repo.getUserRoles(id);
  }

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
