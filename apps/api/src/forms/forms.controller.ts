import { Body, Controller, Get, Param, Post, Query, UsePipes } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  createFormSchema,
  submitFormSchema,
  type CreateFormInput,
  type SubmitFormInput,
} from "@bpm-studio/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { FormsService } from "./forms.service";

@ApiTags("forms")
@Controller("forms")
export class FormsController {
  constructor(private readonly forms: FormsService) {}

  @Get()
  @ApiOkResponse({ description: "List forms." })
  findAll(@Query("organizationId") organizationId?: string) {
    return this.forms.findAll(organizationId);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createFormSchema))
  @ApiCreatedResponse({ description: "Create a schema-based form." })
  create(@Body() body: CreateFormInput) {
    return this.forms.create(body);
  }

  @Post(":id/submit")
  @UsePipes(new ZodValidationPipe(submitFormSchema))
  @ApiCreatedResponse({ description: "Submit a form and optionally patch process variables." })
  submit(@Param("id") id: string, @Body() body: SubmitFormInput) {
    return this.forms.submit(id, body);
  }
}
