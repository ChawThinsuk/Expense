import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CategoryDTO {
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
  slip_image_url !: string;
}