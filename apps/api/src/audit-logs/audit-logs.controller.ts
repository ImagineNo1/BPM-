import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuditLogsService } from "./audit-logs.service";

@ApiTags("audit")
@Controller("audit-logs")
export class AuditLogsController {
  constructor(private readonly auditLogs: AuditLogsService) {}

  @Get()
  @ApiOkResponse({ description: "List audit logs." })
  findAll(@Query("organizationId") organizationId?: string) {
    return this.auditLogs.findAll(organizationId);
  }
}
