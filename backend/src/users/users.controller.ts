import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './DTO/users.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RoleGuard } from '../auth/guard/role.guard';

@Controller('users')
@UseGuards(AccessTokenGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
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

  @Get('byEmail/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    await this.usersService.updateUser(id, dto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }
}
