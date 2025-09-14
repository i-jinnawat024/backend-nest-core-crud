import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "projects" })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "period_month" })
  periodMonth!: Date;

  @Column({ name: "velocity_pt" })
  velocityPt!: number;

  @Column({ name: "project_name" })
  projectName!: string;

  @Column({ name: "project_description" })
  projectDescription!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date;
}
