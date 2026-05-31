import { z } from "zod";

export const processNodeTypes = [
  "start_event",
  "user_task",
  "approval_task",
  "service_task",
  "condition_gateway",
  "document_generation_task",
  "notification_task",
  "end_event",
] as const;

export const processInstanceStatuses = ["running", "completed", "cancelled", "failed"] as const;

export const taskStatuses = [
  "pending",
  "in_progress",
  "approved",
  "rejected",
  "completed",
  "cancelled",
] as const;

export const formFieldTypes = [
  "text",
  "textarea",
  "number",
  "date",
  "select",
  "multi_select",
  "file",
  "signature",
  "table",
  "checkbox",
  "radio",
] as const;

export const domainEventNames = [
  "process.started",
  "process.completed",
  "task.created",
  "task.completed",
  "task.approved",
  "task.rejected",
  "form.submitted",
  "document.generated",
  "webhook.delivered",
  "webhook.failed",
] as const;

export type ProcessNodeType = (typeof processNodeTypes)[number];
export type ProcessInstanceStatus = (typeof processInstanceStatuses)[number];
export type TaskStatus = (typeof taskStatuses)[number];
export type FormFieldType = (typeof formFieldTypes)[number];
export type DomainEventName = (typeof domainEventNames)[number];

export const processNodeSchema = z.object({
  id: z.string().min(1),
  type: z.enum(processNodeTypes),
  label: z.string().min(1),
  position: z.object({ x: z.number(), y: z.number() }).optional(),
  formId: z.string().optional(),
  config: z.record(z.string(), z.unknown()).default({}),
});

export const processEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  condition: z.record(z.string(), z.unknown()).optional(),
  label: z.string().optional(),
});

export const processDefinitionSchema = z.object({
  nodes: z.array(processNodeSchema).min(1),
  edges: z.array(processEdgeSchema),
  variablesSchema: z.record(z.string(), z.unknown()).default({}),
  generatedOutputs: z
    .object({
      forms: z.array(z.string()).default([]),
      databaseTables: z.array(z.string()).default([]),
      apiOperations: z.array(z.string()).default([]),
      mobileScreens: z.array(z.string()).default([]),
      taskInboxes: z.array(z.string()).default([]),
      documents: z.array(z.string()).default([]),
      dashboards: z.array(z.string()).default([]),
    })
    .default({
      forms: [],
      databaseTables: [],
      apiOperations: [],
      mobileScreens: [],
      taskInboxes: [],
      documents: [],
      dashboards: [],
    }),
});

export const createOrganizationSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
});

export const createProcessSchema = z.object({
  organizationId: z.string().min(1),
  workspaceId: z.string().optional(),
  name: z.string().min(2),
  key: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
});

export const createProcessVersionSchema = z.object({
  version: z.string().min(1),
  definition: processDefinitionSchema,
  status: z.enum(["draft", "published"]).default("draft"),
});

export const startProcessSchema = z.object({
  organizationId: z.string().optional(),
  variables: z.record(z.string(), z.unknown()).default({}),
  startedByUserId: z.string().optional(),
});

export const completeTaskSchema = z.object({
  variables: z.record(z.string(), z.unknown()).default({}),
  comment: z.string().optional(),
});

export const createFormSchema = z.object({
  organizationId: z.string().min(1),
  name: z.string().min(2),
  key: z.string().min(2).regex(/^[a-z0-9-]+$/),
  schema: z.record(z.string(), z.unknown()),
  validationRules: z.record(z.string(), z.unknown()).default({}),
});

export const submitFormSchema = z.object({
  organizationId: z.string().optional(),
  processInstanceId: z.string().optional(),
  submittedByUserId: z.string().optional(),
  data: z.record(z.string(), z.unknown()),
});

export type ProcessDefinition = z.infer<typeof processDefinitionSchema>;
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type CreateProcessInput = z.infer<typeof createProcessSchema>;
export type CreateProcessVersionInput = z.infer<typeof createProcessVersionSchema>;
export type StartProcessInput = z.infer<typeof startProcessSchema>;
export type CompleteTaskInput = z.infer<typeof completeTaskSchema>;
export type CreateFormInput = z.infer<typeof createFormSchema>;
export type SubmitFormInput = z.infer<typeof submitFormSchema>;
