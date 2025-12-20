import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
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

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsBoolean()
  @IsOptional()
  isActivated: boolean;
}
