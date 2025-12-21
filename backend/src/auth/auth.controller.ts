import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDTO, RegisterDTO } from './DTO/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }
}
