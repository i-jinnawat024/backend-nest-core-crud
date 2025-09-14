import { ProjectEntity } from "@/domain/entities/project.entity";
import { IProjectRepository } from "@/domain/interfaces/repositories/project-repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  execute(project: Partial<ProjectEntity>) {
    return this.projectRepository.create(project);
  }
}
