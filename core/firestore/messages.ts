import { IsString, Min, MinLength, MaxLength, IsDate } from 'class-validator'

export class Message {
  @IsString()
  senderId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(240)
  text: string;

  @IsDate()
  createdOn: Date;
}