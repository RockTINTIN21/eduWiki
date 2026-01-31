import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, ResetPasswordDTO } from './DTO/auth.dto';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { GetUser } from './decorators/get-user.decorator';
import type { Response, Request } from 'express';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(dto);

    res.cookie('refresh_token', data.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie('access_token', data.tokens.accessToken, {
      httpOnly: true,
      secure: false,
    });

    return {
      user: data.user,
    };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png)$/,
            skipMagicNumbersValidation: true,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    avatar: Express.Multer.File,
    @Body() dto: RegisterDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.register(dto, avatar);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie('access_token', tokens.accessToken, {
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
    res.cookie('access_token', '', {
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
    res.cookie('access_token', data.tokens.accessToken, {
      httpOnly: true,
      secure: false,
    });
    return {
      user: data.user,
    };
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDTO) {
    return this.authService.resetPassword(dto);
  }
}
