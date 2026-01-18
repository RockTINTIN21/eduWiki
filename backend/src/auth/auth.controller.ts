import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  GenerateEmailOtpDTO,
  LoginDTO,
  RegisterDTO,
  VerifyEmailOtpDTO,
} from './DTO/auth.dto';
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
    const data = await this.authService.login(dto);
    console.log('DATA:', data);
    res.cookie('refresh_token', data.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });

    return {
      accessToken: data.tokens.accessToken,
      user: data.user,
    };
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.register(dto);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    return tokens.accessToken;
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@GetUser('id') userId: string, @Res() res: Response) {
    await this.authService.logout(userId);
    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: false,
    });
    return res.json({ success: true });
  }

  @Get('check-username/:username')
  async checkUsername(@Param('username') username: string) {
    return this.authService.checkUniqUsername(username);
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
    const data = await this.authService.refreshAccessToken(id, refreshToken);
    res.cookie('refresh_token', data.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    return {
      accessToken: data.tokens.accessToken,
      user: data.user,
    };
  }

  @Post('/verification-otp')
  generateEmailVerification(@Body() dto: GenerateEmailOtpDTO) {
    return this.authService.generateEmailOTP(dto);
  }

  @Post('/verify')
  verifyEmailCode(@Body() dto: VerifyEmailOtpDTO) {
    return this.authService.verifyEmailOTP(dto);
  }
}
