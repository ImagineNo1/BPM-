import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { createOrganizationSchema, type CreateOrganizationInput } from "@bpm-studio/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { OrganizationsService } from "./organizations.service";

@ApiTags("organizations")
@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizations: OrganizationsService) {}

  @Get()
  @ApiOkResponse({ description: "List organizations visible to the current user." })
  findAll() {
    return this.organizations.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createOrganizationSchema))
  @ApiCreatedResponse({ description: "Create an organization." })
  create(@Body() body: CreateOrganizationInput) {
    return this.organizations.create(body);
  }
}
