import { ProductEntity } from "../../entities/product.entity";

export interface CreateProductData {
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  category?: string | null;
  sku?: string | null;
  isActive?: boolean;
}

export interface IProductRepository {
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  findBySku(sku: string): Promise<ProductEntity | null>;
  findByCategory(category: string): Promise<ProductEntity[]>;
  findActiveProducts(): Promise<ProductEntity[]>;
  create(product: CreateProductData): Promise<ProductEntity>;
  update(
    id: string,
    product: Partial<ProductEntity>
  ): Promise<ProductEntity | null>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  count(): Promise<number>;
}
