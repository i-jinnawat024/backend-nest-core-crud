import { IProjectRepository } from "@/domain/interfaces/repositories/project-repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute() {
    return this.projectRepository.findAll();
  }
}
