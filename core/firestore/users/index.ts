import { IsString, IsDateString, IsEmail } from 'class-validator';

export class UserDocument {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}