import { IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}
