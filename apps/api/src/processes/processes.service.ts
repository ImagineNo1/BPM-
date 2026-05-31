import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateProcessInput, CreateProcessVersionInput } from "@bpm-studio/shared";
import { InMemoryStore } from "../common/in-memory-store";

@Injectable()
export class ProcessesService {
  constructor(private readonly store: InMemoryStore) {}

  findAll(organizationId?: string) {
    return this.store.processes
      .filter((process) => !organizationId || process.organizationId === organizationId)
      .map((process) => ({
        ...process,
        versions: this.store.versions.filter((version) => version.processId === process.id),
      }));
  }

  findOne(id: string) {
    const process = this.store.processes.find((item) => item.id === id);
    if (!process) {
      throw new NotFoundException("Process not found");
    }
    return {
      ...process,
      versions: this.store.versions.filter((version) => version.processId === id),
    };
  }

  create(input: CreateProcessInput) {
    const process = {
      id: this.store.createId("proc"),
      organizationId: input.organizationId,
      workspaceId: input.workspaceId,
      key: input.key,
      name: input.name,
      description: input.description,
      createdAt: this.store.now(),
    };
    this.store.processes.push(process);
    return process;
  }

  createVersion(processId: string, input: CreateProcessVersionInput) {
    this.findOne(processId);
    const version = {
      id: this.store.createId("ver"),
      processId,
      version: input.version,
      status: input.status,
      definition: input.definition,
      createdAt: this.store.now(),
      publishedAt: input.status === "published" ? this.store.now() : undefined,
    };
    this.store.versions.push(version);
    return version;
  }

  publish(processId: string) {
    const process = this.findOne(processId);
    const draft = process.versions.find((version) => version.status === "draft") ?? process.versions.at(-1);
    if (!draft) {
      throw new NotFoundException("Process version not found");
    }
    draft.status = "published";
    draft.publishedAt = this.store.now();
    return draft;
  }

  findPublishedVersion(processId: string) {
    this.findOne(processId);
    const version = this.store.versions
      .filter((item) => item.processId === processId && item.status === "published")
      .at(-1);
    if (!version) {
      throw new NotFoundException("Published process version not found");
    }
    return version;
  }
}
