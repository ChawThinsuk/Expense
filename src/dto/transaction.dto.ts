import { IsString, IsNotEmpty, IsNumber, IsDate, IsIn, IsBoolean } from 'class-validator';

export class TransactionDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id !: number;

  @IsNotEmpty()
  @IsNumber()
  account_id !: number;

  @IsNotEmpty()
  @IsNumber()
  category_id !: number;

  @IsNotEmpty()
  @IsNumber()
  amount !: number;

  @IsNotEmpty()
  @IsDate()
  date !: Date;

  @IsNotEmpty()
  @IsString()
  comment !: string;

  @IsString()
  slip_image_url ?: string;

  @IsString()
  cdn_public_id ?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['income', 'outcome'], {
    message: 'transaction_type must be either "income" or "outcome"',
  })
  transaction_type !: string;

  @IsBoolean()
  deleteImage?: boolean
}
export interface QueryParams {
  month?: string;        
  year?: string;
  account_name?: string;
  category_name?: string;
  transaction_type?: string
  limit?: number
  page?: number
}