import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { InMemoryStore } from "../common/in-memory-store";
import { mongoModels } from "./mongo-models";

const mongodbUri = process.env.MONGODB_URI;
const databaseImports = mongodbUri
  ? [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          uri: config.get<string>("MONGODB_URI"),
          autoIndex: config.get<string>("NODE_ENV") !== "production",
          maxPoolSize: 20,
          serverSelectionTimeoutMS: 3_000,
        }),
      }),
      MongooseModule.forFeature(mongoModels),
    ]
  : [];

@Global()
@Module({
  imports: databaseImports,
  providers: [InMemoryStore],
  exports: [InMemoryStore, ...(mongodbUri ? [MongooseModule] : [])],
})
export class DatabaseModule {}
