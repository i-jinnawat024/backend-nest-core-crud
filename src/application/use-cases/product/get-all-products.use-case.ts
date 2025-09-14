import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { IProductRepository } from '../../../domain/interfaces/repositories/product-repository.interface';

export interface GetAllProductsRequest {
  activeOnly?: boolean;
  category?: string;
}

export interface GetAllProductsResponse {
  products: ProductEntity[];
  total: number;
}

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(request: GetAllProductsRequest = {}): Promise<GetAllProductsResponse> {
    let products: ProductEntity[];

    // Apply filters based on request
    if (request.category) {
      products = await this.productRepository.findByCategory(request.category);
    } else if (request.activeOnly) {
      products = await this.productRepository.findActiveProducts();
    } else {
      products = await this.productRepository.findAll();
    }

    // Filter active products if requested and category filter was applied
    if (request.activeOnly && request.category) {
      products = products.filter(product => product.isActive);
    }

    const total = products.length;

    return { products, total };
  }
}