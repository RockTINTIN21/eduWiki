import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './DTO/users.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { SearchLabelsTypes } from './types/users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles('ADMIN', 'OWNER')
  @Get('')
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('label') label: SearchLabelsTypes,
    @Query('value') value: string,
  ) {
    return this.usersService.findAll({ page, limit, label, value });
  }

  @Get('byId/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles('ADMIN', 'OWNER')
  @Get('byUsername/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get('byEmail/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    await this.usersService.updateUser(id, dto);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }

  @Get(':username')
  getPublicProfile(@Param('username') username: string) {
    return this.usersService.getPublicProfile(username);
  }
}
