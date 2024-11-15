import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id !: number;

  @IsNotEmpty()
  @IsString()
  category_name !: string;
}