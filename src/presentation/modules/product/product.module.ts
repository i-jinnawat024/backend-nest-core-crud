import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/interfaces/repositories/product-repository.interface";
import { TypeOrmProductRepository } from "../../../infrastructure/repositories/typeorm-product.repository";
import { ProductController } from "../../controllers/product.controller";
import { CreateProductUseCase } from "../../../application/use-cases/product/create-product.use-case";
import { GetProductByIdUseCase } from "../../../application/use-cases/product/get-product-by-id.use-case";
import { GetAllProductsUseCase } from "../../../application/use-cases/product/get-all-products.use-case";
import { UpdateProductUseCase } from "../../../application/use-cases/product/update-product.use-case";
import { DeleteProductUseCase } from "../../../application/use-cases/product/delete-product.use-case";

// Repository token for dependency injection
export const PRODUCT_REPOSITORY_TOKEN = "IProductRepository";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    // Repository implementation
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: TypeOrmProductRepository,
    },
    // Use cases
    {
      provide: CreateProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new CreateProductUseCase(productRepository);
      },
      inject: [PRODUCT_REPOSITORY_TOKEN],
    },
    {
      provide: GetProductByIdUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new GetProductByIdUseCase(productRepository);
      },
      inject: [PRODUCT_REPOSITORY_TOKEN],
    },
    {
      provide: GetAllProductsUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new GetAllProductsUseCase(productRepository);
      },
      inject: [PRODUCT_REPOSITORY_TOKEN],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new UpdateProductUseCase(productRepository);
      },
      inject: [PRODUCT_REPOSITORY_TOKEN],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (productRepository: IProductRepository) => {
        return new DeleteProductUseCase(productRepository);
      },
      inject: [PRODUCT_REPOSITORY_TOKEN],
    },
  ],
  exports: [
    PRODUCT_REPOSITORY_TOKEN,
    CreateProductUseCase,
    GetProductByIdUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
