import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { IProductRepository } from '../../../domain/interfaces/repositories/product-repository.interface';

export interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: string;
  sku?: string;
  isActive?: boolean;
}

export interface UpdateProductResponse {
  product: ProductEntity;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    // Validate input
    this.validateRequest(request);

    // Check if product exists
    const existingProduct = await this.productRepository.findById(request.id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    // Business logic validation
    await this.validateBusinessRules(request, existingProduct);

    // Prepare update data
    const updateData: Partial<ProductEntity> = {};
    
    if (request.name !== undefined) updateData.name = request.name;
    if (request.description !== undefined) updateData.description = request.description;
    if (request.price !== undefined) updateData.price = request.price;
    if (request.quantity !== undefined) updateData.quantity = request.quantity;
    if (request.category !== undefined) updateData.category = request.category;
    if (request.sku !== undefined) updateData.sku = request.sku;
    if (request.isActive !== undefined) updateData.isActive = request.isActive;

    // Update product
    const updatedProduct = await this.productRepository.update(request.id, updateData);
    
    if (!updatedProduct) {
      throw new Error('Failed to update product');
    }

    return { product: updatedProduct };
  }

  private validateRequest(request: UpdateProductRequest): void {
    if (!request.id || request.id.trim().length === 0) {
      throw new Error('Product ID is required');
    }

    // Validate price if provided
    if (request.price !== undefined && request.price < 0) {
      throw new Error('Product price cannot be negative');
    }

    // Validate quantity if provided
    if (request.quantity !== undefined && request.quantity < 0) {
      throw new Error('Product quantity cannot be negative');
    }

    // Validate name if provided
    if (request.name !== undefined) {
      if (!request.name || request.name.trim().length === 0) {
        throw new Error('Product name cannot be empty');
      }
      if (request.name.length > 255) {
        throw new Error('Product name cannot exceed 255 characters');
      }
    }
  }

  private async validateBusinessRules(
    request: UpdateProductRequest,
    existingProduct: ProductEntity,
  ): Promise<void> {
    // Check if new name conflicts with existing products
    if (request.name && request.name !== existingProduct.name) {
      const productWithSameName = await this.productRepository.findByName(request.name);
      if (productWithSameName && productWithSameName.id !== existingProduct.id) {
        throw new Error('Product with this name already exists');
      }
    }

    // Check if new SKU conflicts with existing products
    if (request.sku && request.sku !== existingProduct.sku) {
      const productWithSameSku = await this.productRepository.findBySku(request.sku);
      if (productWithSameSku && productWithSameSku.id !== existingProduct.id) {
        throw new Error('Product with this SKU already exists');
      }
    }
  }
}