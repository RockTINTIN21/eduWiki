import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './DTO/users.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { SearchLabelsTypes } from './types/users.types';
import type { Request } from 'express';

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
    console.log('FINDALL');
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

  @Get('public-profile/:username')
  getPublicProfile(@Req() req: Request, @Param('username') username: string) {
    const token: string | undefined = req.cookies['access_token'];
    return this.usersService.getPublicProfile(username, token);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  me(@Req() req: Request) {
    const token: string = req.cookies['access_token'];
    return this.usersService.me(token);
  }
}
