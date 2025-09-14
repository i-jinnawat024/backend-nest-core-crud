import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../domain/interfaces/repositories/product-repository.interface';

export interface DeleteProductRequest {
  id: string;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(request: DeleteProductRequest): Promise<DeleteProductResponse> {
    // Validate input
    this.validateRequest(request);

    // Check if product exists
    const existingProduct = await this.productRepository.findById(request.id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    // Business logic validation
    await this.validateBusinessRules(request);

    // Delete product
    const deleted = await this.productRepository.delete(request.id);
    
    if (!deleted) {
      throw new Error('Failed to delete product');
    }

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }

  private validateRequest(request: DeleteProductRequest): void {
    if (!request.id || request.id.trim().length === 0) {
      throw new Error('Product ID is required');
    }
  }

  private async validateBusinessRules(request: DeleteProductRequest): Promise<void> {
    // Add any business rules for deletion here
    // For example, check if product is referenced in orders, etc.
    // This is where you would implement soft delete logic if needed
    
    // For now, we allow direct deletion
    // In a real application, you might want to:
    // 1. Check if product has pending orders
    // 2. Implement soft delete instead of hard delete
    // 3. Archive the product instead of deleting
  }
}