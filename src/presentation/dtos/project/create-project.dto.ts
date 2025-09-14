import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateProjectDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  periodMonth!: Date;

  @IsNumber()
  @IsNotEmpty()
  velocityPt!: number;

  @IsString()
  @IsNotEmpty()
  projectName!: string;

  @IsString()
  @IsNotEmpty()
  projectDescription!: string;
}
