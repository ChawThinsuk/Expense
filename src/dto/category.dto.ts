import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  category_name !: string;
}