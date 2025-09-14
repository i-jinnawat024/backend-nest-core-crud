import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProductEntity } from "../../../domain/entities/product.entity";

export class ProductResponseDto {
  @ApiProperty({
    description: "Product unique identifier",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "Product name",
    example: "iPhone 15 Pro",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Product description",
    example: "Latest iPhone with advanced camera system",
  })
  description: string | null;

  @ApiProperty({
    description: "Product price",
    example: 999.99,
  })
  price: number;

  @ApiProperty({
    description: "Product quantity in stock",
    example: 100,
  })
  quantity: number;

  @ApiPropertyOptional({
    description: "Product category",
    example: "Electronics",
  })
  category: string | null;

  @ApiPropertyOptional({
    description: "Product SKU (Stock Keeping Unit)",
    example: "IPH15P-256-BLK",
  })
  sku: string | null;

  @ApiProperty({
    description: "Whether the product is active",
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: "Product creation timestamp",
    example: "2024-01-15T10:30:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Product last update timestamp",
    example: "2024-01-15T10:30:00Z",
  })
  updatedAt: Date;

  constructor(product: ProductEntity) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.category = product.category;
    this.sku = product.sku;
    this.isActive = product.isActive;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  static fromEntity(product: ProductEntity): ProductResponseDto {
    return new ProductResponseDto(product);
  }

  static fromEntities(products: ProductEntity[]): ProductResponseDto[] {
    return products.map((product) => new ProductResponseDto(product));
  }
}
