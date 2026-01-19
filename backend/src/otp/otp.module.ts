import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma.service';
import { OtpRepo } from './repo/otp.repo';

@Module({
  imports: [UsersModule],
  controllers: [OtpController],
  providers: [OtpService, OtpRepo, PrismaService],
  exports: [OtpService],
})
export class OtpModule {}
