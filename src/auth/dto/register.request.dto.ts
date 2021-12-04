import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @MinLength(11)
  phone_number: string;
}
