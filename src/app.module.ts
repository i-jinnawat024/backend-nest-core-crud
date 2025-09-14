import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { ProductModule } from "./presentation/modules/product/product.module";
import { ProjectModule } from "./presentation/modules/project/project.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    ProductModule,
    ProjectModule,
  ],
})
export class AppModule {}
