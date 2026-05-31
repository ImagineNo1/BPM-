import type { DomainEventName, ProcessDefinition } from "@bpm-studio/shared";

export type WorkflowExecutionJob =
  | {
      type: "start-process";
      processVersionId: string;
      processInstanceId: string;
      variables: Record<string, unknown>;
    }
  | {
      type: "resume-from-task";
      taskId: string;
      processInstanceId: string;
      variables: Record<string, unknown>;
    };

export type WorkflowDomainEvent = {
  name: DomainEventName;
  organizationId: string;
  aggregateId: string;
  occurredAt: string;
  payload: Record<string, unknown>;
};

export interface WorkflowEngine {
  validateDefinition(definition: ProcessDefinition): Promise<void>;
  startProcess(job: Extract<WorkflowExecutionJob, { type: "start-process" }>): Promise<WorkflowDomainEvent[]>;
  resumeFromTask(job: Extract<WorkflowExecutionJob, { type: "resume-from-task" }>): Promise<WorkflowDomainEvent[]>;
}

export class PlaceholderWorkflowEngine implements WorkflowEngine {
  async validateDefinition(definition: ProcessDefinition) {
    const hasStart = definition.nodes.some((node) => node.type === "start_event");
    const hasEnd = definition.nodes.some((node) => node.type === "end_event");

    if (!hasStart || !hasEnd) {
      throw new Error("Process definitions must include start_event and end_event nodes.");
    }
  }

  async startProcess(job: Extract<WorkflowExecutionJob, { type: "start-process" }>) {
    return [
      {
        name: "process.started" as const,
        organizationId: "mock-org",
        aggregateId: job.processInstanceId,
        occurredAt: new Date().toISOString(),
        payload: { processVersionId: job.processVersionId, variables: job.variables },
      },
    ];
  }

  async resumeFromTask(job: Extract<WorkflowExecutionJob, { type: "resume-from-task" }>) {
    return [
      {
        name: "task.completed" as const,
        organizationId: "mock-org",
        aggregateId: job.taskId,
        occurredAt: new Date().toISOString(),
        payload: { processInstanceId: job.processInstanceId, variables: job.variables },
      },
    ];
  }
}
