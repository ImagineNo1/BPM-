import { Module } from "@nestjs/common";
import { ProcessesModule } from "../processes/processes.module";
import { RuntimeController } from "./runtime.controller";
import { RuntimeService } from "./runtime.service";

@Module({
  imports: [ProcessesModule],
  controllers: [RuntimeController],
  providers: [RuntimeService],
})
export class RuntimeModule {}
