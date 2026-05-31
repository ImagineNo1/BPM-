import { Injectable } from "@nestjs/common";
import type { ProcessDefinition, TaskStatus } from "@bpm-studio/shared";

export type OrganizationRecord = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export type ProcessRecord = {
  id: string;
  organizationId: string;
  workspaceId?: string;
  key: string;
  name: string;
  description?: string;
  createdAt: string;
};

export type ProcessVersionRecord = {
  id: string;
  processId: string;
  version: string;
  status: "draft" | "published";
  definition: ProcessDefinition;
  createdAt: string;
  publishedAt?: string;
};

export type ProcessInstanceRecord = {
  id: string;
  organizationId: string;
  processId: string;
  processVersionId: string;
  status: "running" | "completed" | "cancelled" | "failed";
  variables: Record<string, unknown>;
  activeNodeIds: string[];
  startedAt: string;
};

export type TaskRecord = {
  id: string;
  organizationId: string;
  processInstanceId: string;
  processVersionId: string;
  nodeId: string;
  title: string;
  status: TaskStatus;
  assignedToUserId?: string;
  assignedToRoleId?: string;
  formId?: string;
  dueAt?: string;
  slaMinutes?: number;
};

export type FormRecord = {
  id: string;
  organizationId: string;
  key: string;
  name: string;
  schema: Record<string, unknown>;
  validationRules: Record<string, unknown>;
  createdAt: string;
};

export type FormSubmissionRecord = {
  id: string;
  organizationId: string;
  formId: string;
  processInstanceId?: string;
  data: Record<string, unknown>;
  createdAt: string;
};

export type AuditLogRecord = {
  id: string;
  organizationId: string;
  processInstanceId?: string;
  event: string;
  entityType: string;
  entityId: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

const now = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

@Injectable()
export class InMemoryStore {
  organizations: OrganizationRecord[] = [
    { id: "org_nava", name: "نوافرایند", slug: "nava", createdAt: now() },
  ];

  processes: ProcessRecord[] = [
    {
      id: "proc_purchase",
      organizationId: "org_nava",
      key: "purchase-request",
      name: "درخواست خرید سازمانی",
      description: "نمونه فرایند برای سیستم عملیاتی خرید.",
      createdAt: now(),
    },
  ];

  versions: ProcessVersionRecord[] = [
    {
      id: "ver_purchase_v1",
      processId: "proc_purchase",
      version: "v1",
      status: "published",
      publishedAt: now(),
      createdAt: now(),
      definition: {
        nodes: [
          { id: "start", type: "start_event", label: "شروع", config: {} },
          { id: "request_form", type: "user_task", label: "ثبت درخواست", formId: "form_purchase", config: {} },
          { id: "finance", type: "approval_task", label: "تایید مالی", formId: "form_purchase", config: {} },
          { id: "document", type: "document_generation_task", label: "تولید سند", config: {} },
          { id: "end", type: "end_event", label: "پایان", config: {} },
        ],
        edges: [
          { id: "e1", source: "start", target: "request_form" },
          { id: "e2", source: "request_form", target: "finance" },
          { id: "e3", source: "finance", target: "document" },
          { id: "e4", source: "document", target: "end" },
        ],
        variablesSchema: { title: "string", amount: "number", costCenter: "string" },
        generatedOutputs: {
          forms: ["purchase-request"],
          databaseTables: ["purchase_requests", "approval_decisions"],
          apiOperations: ["start", "getInstance", "completeTask", "approveTask", "rejectTask"],
          mobileScreens: ["request-intake", "finance-approval"],
          taskInboxes: ["finance"],
          documents: ["purchase-order"],
          dashboards: ["sla", "spend"],
        },
      },
    },
  ];

  instances: ProcessInstanceRecord[] = [
    {
      id: "inst_purchase_1048",
      organizationId: "org_nava",
      processId: "proc_purchase",
      processVersionId: "ver_purchase_v1",
      status: "running",
      variables: { title: "خرید تجهیزات شبکه", amount: 680000000, costCenter: "IT" },
      activeNodeIds: ["finance"],
      startedAt: now(),
    },
  ];

  tasks: TaskRecord[] = [
    {
      id: "task_finance_1048",
      organizationId: "org_nava",
      processInstanceId: "inst_purchase_1048",
      processVersionId: "ver_purchase_v1",
      nodeId: "finance",
      title: "تایید مالی خرید تجهیزات شبکه",
      status: "pending",
      assignedToRoleId: "finance_approver",
      formId: "form_purchase",
      slaMinutes: 480,
    },
  ];

  forms: FormRecord[] = [
    {
      id: "form_purchase",
      organizationId: "org_nava",
      key: "purchase-request",
      name: "فرم درخواست خرید",
      schema: {
        fields: [
          { id: "title", type: "text", label: "عنوان درخواست", required: true },
          { id: "amount", type: "number", label: "مبلغ پیشنهادی", required: true },
          { id: "costCenter", type: "select", label: "مرکز هزینه", required: true },
        ],
      },
      validationRules: { amount: { min: 1 } },
      createdAt: now(),
    },
  ];

  submissions: FormSubmissionRecord[] = [];

  auditLogs: AuditLogRecord[] = [
    {
      id: "audit_started_1048",
      organizationId: "org_nava",
      processInstanceId: "inst_purchase_1048",
      event: "process.started",
      entityType: "ProcessInstance",
      entityId: "inst_purchase_1048",
      payload: { variables: { title: "خرید تجهیزات شبکه" } },
      createdAt: now(),
    },
    {
      id: "audit_task_created_1048",
      organizationId: "org_nava",
      processInstanceId: "inst_purchase_1048",
      event: "task.created",
      entityType: "Task",
      entityId: "task_finance_1048",
      payload: { nodeId: "finance" },
      createdAt: now(),
    },
  ];

  createId(prefix: string) {
    return id(prefix);
  }

  now() {
    return now();
  }
}
