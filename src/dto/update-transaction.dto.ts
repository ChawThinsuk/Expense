import { IsString, IsNumber, IsDate, IsIn, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTransactionDTO {
  @IsOptional()
  @IsNumber()
  user_id ?: number | undefined;

  @IsOptional()
  @IsNumber()
  account_id ?: number | undefined;

  @IsOptional()
  @IsNumber()
  category_id ?: number | undefined;

  @IsOptional()
  @IsNumber()
  amount ?: number | undefined;

  @IsOptional()
  @IsDate()
  date ?: Date | undefined;

  @IsOptional()
  @IsString()
  comment ?: string | undefined;

  @IsOptional()
  @IsString()
  slip_image_url ?: string | undefined;

  @IsOptional()
  @IsString()
  cdn_public_id ?: string | undefined;

  @IsOptional()
  @IsString()
  @IsIn(['income', 'outcome'], {
    message: 'transaction_type must be either "income" or "outcome"',
  })
  transaction_type ?: string | undefined;

  @IsOptional()
  @IsBoolean()
  deleteImage?: boolean | undefined;
}