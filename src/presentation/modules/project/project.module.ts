import { CreateProductUseCase } from "@/application/use-cases/product/create-product.use-case";
import { GetAllProductsUseCase } from "@/application/use-cases/product/get-all-products.use-case";
import { CreateProjectUseCase } from "@/application/use-cases/project/create-project.use-case";
import { GetAllProjectsUseCase } from "@/application/use-cases/project/get-all-projects.use-case";
import { ProjectEntity } from "@/domain/entities/project.entity";
import { IProjectRepository } from "@/domain/interfaces/repositories/project-repository.interface";
import { TypeOrmProjectRepository } from "@/infrastructure/repositories/typeorm-project.repository";
import { ProjectController } from "@/presentation/controllers/project.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

export const PROJECT_REPOSITORY_TOKEN = "IProjectRepository";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  controllers: [ProjectController],
  providers: [
    {
      provide: PROJECT_REPOSITORY_TOKEN,
      useClass: TypeOrmProjectRepository,
    },
    {
      provide: CreateProjectUseCase,
      useFactory: (repo: IProjectRepository) => {
        return new CreateProjectUseCase(repo);
      },
      inject: [PROJECT_REPOSITORY_TOKEN],
    },
    {
      provide: GetAllProjectsUseCase,
      useFactory: (repo: IProjectRepository) => {
        return new GetAllProjectsUseCase(repo);
      },
      inject: [PROJECT_REPOSITORY_TOKEN],
    },
  ],
})
export class ProjectModule {}
