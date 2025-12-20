import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDTO, UpdateUserDTO } from './DTO/users.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('byId/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('byUsername/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDTO) {
    await this.usersService.createUser(dto);
    return {
      message: 'User created successfully.',
    };
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    await this.usersService.updateUser(id, dto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }
}
