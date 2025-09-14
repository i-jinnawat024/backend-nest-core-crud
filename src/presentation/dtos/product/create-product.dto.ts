import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 15 Pro',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => value?.trim())
  name!: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Latest iPhone with advanced camera system',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim() || null)
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  price!: number;

  @ApiProperty({
    description: 'Product quantity in stock',
    example: 100,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  quantity!: number;

  @ApiPropertyOptional({
    description: 'Product category',
    example: 'Electronics',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim() || null)
  category?: string;

  @ApiPropertyOptional({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'IPH15P-256-BLK',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim() || null)
  sku?: string;
}