import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class GenerateEmailOtpDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['REGISTRATION', 'PASSWORD_RESET'], {
    message: 'TYPE должен быть одним из: REGISTRATION, PASSWORD_RESET',
  })
  type: 'REGISTRATION' | 'PASSWORD_RESET';
}

export class VerifyEmailOtpDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  code: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['REGISTRATION', 'PASSWORD_RESET'], {
    message: 'TYPE должен быть одним из: REGISTRATION, PASSWORD_RESET',
  })
  type: 'REGISTRATION' | 'PASSWORD_RESET';
}
