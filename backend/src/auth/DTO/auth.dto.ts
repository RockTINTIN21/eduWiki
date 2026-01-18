import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

export class RegisterDTO {
  // @IsOptional()
  // avatar: File;


  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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
  //
  // @IsString()
  // passwordConfirm: string;
}

export class GenerateEmailOtpDTO {
  @IsString()
  @IsEmail()
  email: string;
}

export class VerifyEmailOtpDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  code: string;
}
