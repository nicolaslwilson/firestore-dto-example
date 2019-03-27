import { IsString } from 'class-validator';

export class Snake {
  @IsString()
  name: string;
}