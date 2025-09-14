import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'iPhone 15 Pro Max',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value?.trim())
  name?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Updated description for the latest iPhone',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim() || null)
  description?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 1099.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Transform(({ value }) => value !== undefined ? parseFloat(value) : undefined)
  price?: number;

  @ApiPropertyOptional({
    description: 'Product quantity in stock',
    example: 150,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0)
  @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : undefined)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Product category',
    example: 'Smartphones',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim() || null)
  category?: string;

  @ApiPropertyOptional({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'IPH15PM-512-BLK',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim() || null)
  sku?: string;

  @ApiPropertyOptional({
    description: 'Whether the product is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  isActive?: boolean;
}