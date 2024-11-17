import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AccountDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id !: number;

  @IsNotEmpty()
  @IsString()
  account_name !: string;
}