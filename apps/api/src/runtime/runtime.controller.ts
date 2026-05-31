import { Body, Controller, Get, Param, Post, Query, UsePipes } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  completeTaskSchema,
  startProcessSchema,
  type CompleteTaskInput,
  type StartProcessInput,
  type TaskStatus,
} from "@bpm-studio/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { RuntimeService } from "./runtime.service";

@ApiTags("runtime")
@Controller("runtime")
export class RuntimeController {
  constructor(private readonly runtime: RuntimeService) {}

  @Post("processes/:processId/start")
  @UsePipes(new ZodValidationPipe(startProcessSchema))
  @ApiCreatedResponse({ description: "Start a process instance." })
  startProcess(@Param("processId") processId: string, @Body() body: StartProcessInput) {
    return this.runtime.startProcess(processId, body);
  }

  @Get("instances/:id")
  @ApiOkResponse({ description: "Read a runtime process instance." })
  findInstance(@Param("id") id: string) {
    return this.runtime.findInstance(id);
  }

  @Get("tasks")
  @ApiOkResponse({ description: "List runtime tasks." })
  findTasks(@Query("status") status?: TaskStatus) {
    return this.runtime.findTasks(status);
  }

  @Post("tasks/:id/complete")
  @UsePipes(new ZodValidationPipe(completeTaskSchema))
  completeTask(@Param("id") id: string, @Body() body: CompleteTaskInput) {
    return this.runtime.completeTask(id, body);
  }

  @Post("tasks/:id/approve")
  @UsePipes(new ZodValidationPipe(completeTaskSchema))
  approveTask(@Param("id") id: string, @Body() body: CompleteTaskInput) {
    return this.runtime.approveTask(id, body);
  }

  @Post("tasks/:id/reject")
  @UsePipes(new ZodValidationPipe(completeTaskSchema))
  rejectTask(@Param("id") id: string, @Body() body: CompleteTaskInput) {
    return this.runtime.rejectTask(id, body);
  }
}
