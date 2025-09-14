import { CreateProjectUseCase } from "@/application/use-cases/project/create-project.use-case";
import { GetAllProjectsUseCase } from "@/application/use-cases/project/get-all-projects.use-case";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from "../dtos/project/create-project.dto";

@ApiTags("ProjectMonthlySummary")
@Controller("project")
export class ProjectController {
  constructor(
    private readonly getAllProjectsUseCase: GetAllProjectsUseCase,
    private readonly createProjectUseCase: CreateProjectUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all project" })
  async getAllProjects() {
    return this.getAllProjectsUseCase.execute();
  }

  @Post("create")
  async createProject(@Body() dto: CreateProjectDto) {
    console.log(dto);
    return this.createProjectUseCase.execute(dto);
  }
}
