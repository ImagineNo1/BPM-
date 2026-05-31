import { Injectable, NotFoundException } from "@nestjs/common";
import type { CompleteTaskInput, StartProcessInput, TaskStatus } from "@bpm-studio/shared";
import { InMemoryStore, TaskRecord } from "../common/in-memory-store";
import { getMockContext } from "../common/mock-context";
import { ProcessesService } from "../processes/processes.service";

@Injectable()
export class RuntimeService {
  constructor(
    private readonly store: InMemoryStore,
    private readonly processes: ProcessesService,
  ) {}

  startProcess(processId: string, input: StartProcessInput) {
    const context = getMockContext();
    const version = this.processes.findPublishedVersion(processId);
    const instance = {
      id: this.store.createId("inst"),
      organizationId: input.organizationId ?? context.organizationId,
      processId,
      processVersionId: version.id,
      status: "running" as const,
      variables: input.variables,
      activeNodeIds: ["request_form"],
      startedAt: this.store.now(),
    };
    this.store.instances.push(instance);

    const firstTaskNode = version.definition.nodes.find((node) => node.type === "user_task" || node.type === "approval_task");
    if (firstTaskNode) {
      this.store.tasks.push({
        id: this.store.createId("task"),
        organizationId: instance.organizationId,
        processInstanceId: instance.id,
        processVersionId: version.id,
        nodeId: firstTaskNode.id,
        title: firstTaskNode.label,
        status: "pending",
        formId: firstTaskNode.formId,
      });
    }

    this.audit(instance.organizationId, "process.started", "ProcessInstance", instance.id, {
      processId,
      processVersionId: version.id,
      variables: input.variables,
    });

    return instance;
  }

  findInstance(id: string) {
    const instance = this.store.instances.find((item) => item.id === id);
    if (!instance) {
      throw new NotFoundException("Process instance not found");
    }
    return {
      ...instance,
      tasks: this.store.tasks.filter((task) => task.processInstanceId === id),
      auditLogs: this.store.auditLogs.filter((log) => log.processInstanceId === id),
    };
  }

  findTasks(status?: TaskStatus) {
    return this.store.tasks.filter((task) => !status || task.status === status);
  }

  completeTask(id: string, input: CompleteTaskInput) {
    return this.transitionTask(id, "completed", "task.completed", input);
  }

  approveTask(id: string, input: CompleteTaskInput) {
    return this.transitionTask(id, "approved", "task.approved", input);
  }

  rejectTask(id: string, input: CompleteTaskInput) {
    return this.transitionTask(id, "rejected", "task.rejected", input);
  }

  private transitionTask(id: string, status: TaskRecord["status"], event: string, input: CompleteTaskInput) {
    const task = this.store.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    task.status = status;

    const instance = this.store.instances.find((item) => item.id === task.processInstanceId);
    if (instance) {
      instance.variables = { ...instance.variables, ...input.variables };
      this.audit(task.organizationId, event, "Task", task.id, {
        processInstanceId: instance.id,
        variablesPatch: input.variables,
        comment: input.comment,
      });
    }

    return task;
  }

  private audit(
    organizationId: string,
    event: string,
    entityType: string,
    entityId: string,
    payload: Record<string, unknown>,
  ) {
    this.store.auditLogs.push({
      id: this.store.createId("audit"),
      organizationId,
      event,
      entityType,
      entityId,
      processInstanceId: entityType === "ProcessInstance" ? entityId : undefined,
      payload,
      createdAt: this.store.now(),
    });
  }
}
