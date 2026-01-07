import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './DTO/auth.dto';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { GetUser } from './decorators/get-user.decorator';

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

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }
}
