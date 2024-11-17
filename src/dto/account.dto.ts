import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AccountDTO {
  @IsNotEmpty()
  @IsString()
  account_name !: string;
}