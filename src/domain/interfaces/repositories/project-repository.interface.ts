import { ProjectEntity } from "@/domain/entities/project.entity";

export interface IProjectRepository {
  findAll(): Promise<ProjectEntity[]>;
  create(project: Partial<ProjectEntity>): Promise<ProjectEntity>;
}
