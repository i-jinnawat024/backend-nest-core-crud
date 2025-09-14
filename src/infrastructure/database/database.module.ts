import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProjectEntity } from "../../domain/entities/project.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get("DATABASE_URL");

        if (databaseUrl) {
          // Use DATABASE_URL if provided
          return {
            type: "postgres",
            url: databaseUrl,
            entities: [ProductEntity, ProjectEntity],
            synchronize: configService.get("DB_SYNCHRONIZE") === "true",
            logging: configService.get("DB_LOGGING") === "true",
            ssl:
              configService.get("NODE_ENV") === "production"
                ? { rejectUnauthorized: false }
                : false,
          };
        } else {
          // Use individual connection parameters
          return {
            type: "postgres",
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USERNAME"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_DATABASE"),
            entities: [ProductEntity, ProjectEntity],
            synchronize: configService.get("DB_SYNCHRONIZE") === "true",
            logging: configService.get("DB_LOGGING") === "true",
            ssl:
              configService.get("NODE_ENV") === "production"
                ? { rejectUnauthorized: false }
                : false,
          };
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
