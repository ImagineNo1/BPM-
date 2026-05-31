import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../common/in-memory-store";

@Injectable()
export class AuditLogsService {
  constructor(private readonly store: InMemoryStore) {}

  findAll(organizationId?: string) {
    return this.store.auditLogs
      .filter((log) => !organizationId || log.organizationId === organizationId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}
