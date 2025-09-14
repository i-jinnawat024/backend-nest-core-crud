import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../../domain/entities/product.entity";
import {
  IProductRepository,
  CreateProductData,
} from "../../domain/interfaces/repositories/product-repository.interface";
import { BaseTypeOrmRepository } from "./base-typeorm.repository";

@Injectable()
export class TypeOrmProductRepository
  extends BaseTypeOrmRepository<ProductEntity>
  implements IProductRepository
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>
  ) {
    super(repo);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.repo.find({
      order: { createdAt: "DESC" },
    });
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.repo.findOne({ where: { id } });
    return product || null;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const product = await this.repo.findOne({ where: { name } });
    return product || null;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    const product = await this.repo.findOne({ where: { sku } });
    return product || null;
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    return this.repo.find({
      where: { category },
      order: { createdAt: "DESC" },
    });
  }

  async findActiveProducts(): Promise<ProductEntity[]> {
    return this.repo.find({
      where: { isActive: true },
      order: { createdAt: "DESC" },
    });
  }

  async create(productData: CreateProductData): Promise<ProductEntity> {
    const product = this.repo.create(productData);
    return this.repo.save(product);
  }

  async update(
    id: string,
    productData: Partial<ProductEntity>
  ): Promise<ProductEntity | null> {
    const updateResult = await this.repo.update(id, productData);

    if (updateResult.affected === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return (
      deleteResult.affected !== null &&
      deleteResult.affected !== undefined &&
      deleteResult.affected > 0
    );
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repo.count({ where: { id } });
    return count > 0;
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
