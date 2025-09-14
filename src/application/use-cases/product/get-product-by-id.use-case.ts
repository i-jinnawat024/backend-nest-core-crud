import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { IProductRepository } from '../../../domain/interfaces/repositories/product-repository.interface';

export interface GetProductByIdRequest {
  id: string;
}

export interface GetProductByIdResponse {
  product: ProductEntity;
}

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(request: GetProductByIdRequest): Promise<GetProductByIdResponse> {
    // Validate input
    this.validateRequest(request);

    // Find product
    const product = await this.productRepository.findById(request.id);
    
    if (!product) {
      throw new Error('Product not found');
    }

    return { product };
  }

  private validateRequest(request: GetProductByIdRequest): void {
    if (!request.id || request.id.trim().length === 0) {
      throw new Error('Product ID is required');
    }
  }
}