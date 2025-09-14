import { Injectable } from "@nestjs/common";
import BaseTypeOrmRepository from "./base-typeorm.repository";
import { ProjectEntity } from "@/domain/entities/project.entity";
import { IProjectRepository } from "@/domain/interfaces/repositories/project-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmProjectRepository
  extends BaseTypeOrmRepository<ProjectEntity>
  implements IProjectRepository
{
  constructor(
    @InjectRepository(ProjectEntity)
    private repo: Repository<ProjectEntity>
  ) {
    super(repo);
  }

  async findAll(): Promise<ProjectEntity[]> {
    return this.repo.find({
      order: { createdAt: "DESC" },
    });
  }

  async create(entity: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const result = this.repo.create(entity);
    return this.repo.save(result);
  }
}
