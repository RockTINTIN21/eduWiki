import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be at least 8 characters long and ' +
        'contain at least one uppercase letter, one lowercase letter, ' +
        'one number, and one symbol.',
    },
  )
  password: string;
}

export class RegisterDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsBoolean()
  @IsOptional()
  isActivated: boolean;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be at least 8 characters long and ' +
        'contain at least one uppercase letter, one lowercase letter, ' +
        'one number, and one symbol.',
    },
  )
  password: string;

  @IsString()
  passwordConfirm: string;
}
