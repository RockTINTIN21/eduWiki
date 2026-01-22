import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { GenerateEmailOtpDTO, VerifyEmailOtpDTO } from './otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/verification-otp')
  generateEmailVerification(@Body() dto: GenerateEmailOtpDTO) {
    return this.otpService.generateEmailOTP(dto);
  }

  @Post('/verify')
  verifyEmailCode(@Body() dto: VerifyEmailOtpDTO) {
    return this.otpService.verifyEmailOTP(dto);
  }
}
