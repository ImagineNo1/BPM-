import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuditLogsModule } from "./audit-logs/audit-logs.module";
import { DatabaseModule } from "./database/database.module";
import { FormsModule } from "./forms/forms.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { ProcessesModule } from "./processes/processes.module";
import { RuntimeModule } from "./runtime/runtime.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    OrganizationsModule,
    ProcessesModule,
    RuntimeModule,
    FormsModule,
    AuditLogsModule,
  ],
})
export class AppModule {}
