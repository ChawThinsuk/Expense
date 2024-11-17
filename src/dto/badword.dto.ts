import { IsString, IsNotEmpty } from 'class-validator';

export class BadWordDTO {
  @IsNotEmpty()
  @IsString()
  word !: string;
}