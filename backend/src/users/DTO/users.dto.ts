import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

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
