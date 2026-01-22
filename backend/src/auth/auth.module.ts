import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { AuthRepo } from './repo/auth.repo';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.stategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'node:crypto';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (_, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
    }),
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AuthRepo,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
