import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { IProductRepository, CreateProductData } from '../../../domain/interfaces/repositories/product-repository.interface';

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  sku?: string;
}

export interface CreateProductResponse {
  product: ProductEntity;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    // Business logic validation
    await this.validateBusinessRules(request);

    // Create product
    const productData: CreateProductData = {
      name: request.name,
      description: request.description || null,
      price: request.price,
      quantity: request.quantity,
      category: request.category || null,
      sku: request.sku || null,
      isActive: true,
    };

    const product = await this.productRepository.create(productData);

    return { product };
  }

  private async validateBusinessRules(request: CreateProductRequest): Promise<void> {
    // Check if product name already exists
    const existingProduct = await this.productRepository.findByName(request.name);
    if (existingProduct) {
      throw new Error('Product with this name already exists');
    }

    // Check if SKU already exists (if provided)
    if (request.sku) {
      const existingProductBySku = await this.productRepository.findBySku(request.sku);
      if (existingProductBySku) {
        throw new Error('Product with this SKU already exists');
      }
    }

    // Validate price
    if (request.price < 0) {
      throw new Error('Product price cannot be negative');
    }

    // Validate quantity
    if (request.quantity < 0) {
      throw new Error('Product quantity cannot be negative');
    }

    // Validate name
    if (!request.name || request.name.trim().length === 0) {
      throw new Error('Product name is required');
    }

    if (request.name.length > 255) {
      throw new Error('Product name cannot exceed 255 characters');
    }
  }
}