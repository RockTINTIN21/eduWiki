import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './DTO/auth.dto';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { GetUser } from './decorators/get-user.decorator';
import type { Response, Request } from 'express';
import { RefreshTokenGuard } from './guard/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(dto);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });

    return tokens.accessToken;
  }

  @Post('/register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@GetUser('id') userId: string) {
    console.log('USERId')
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, refreshToken } = req.user as {
      id: string;
      refreshToken: string;
    };
    const tokens = await this.authService.refreshAccessToken(id, refreshToken);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    return tokens.accessToken;
  }
}
