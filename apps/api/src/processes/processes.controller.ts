import { Body, Controller, Get, Param, Post, Query, UsePipes } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  createProcessSchema,
  createProcessVersionSchema,
  type CreateProcessInput,
  type CreateProcessVersionInput,
} from "@bpm-studio/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { ProcessesService } from "./processes.service";

@ApiTags("processes")
@Controller("processes")
export class ProcessesController {
  constructor(private readonly processes: ProcessesService) {}

  @Get()
  @ApiOkResponse({ description: "List processes." })
  findAll(@Query("organizationId") organizationId?: string) {
    return this.processes.findAll(organizationId);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createProcessSchema))
  @ApiCreatedResponse({ description: "Create a process shell." })
  create(@Body() body: CreateProcessInput) {
    return this.processes.create(body);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Read one process with versions." })
  findOne(@Param("id") id: string) {
    return this.processes.findOne(id);
  }

  @Post(":id/versions")
  @UsePipes(new ZodValidationPipe(createProcessVersionSchema))
  @ApiCreatedResponse({ description: "Create a draft or published process version." })
  createVersion(@Param("id") id: string, @Body() body: CreateProcessVersionInput) {
    return this.processes.createVersion(id, body);
  }

  @Post(":id/publish")
  @ApiOkResponse({ description: "Publish the latest draft version." })
  publish(@Param("id") id: string) {
    return this.processes.publish(id);
  }
}
