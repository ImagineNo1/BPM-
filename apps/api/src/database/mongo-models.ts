import { Schema, SchemaTypes } from "mongoose";

const timestamps = { createdAt: "createdAt", updatedAt: "updatedAt" };

const metadataFields = {
  metadata: { type: SchemaTypes.Mixed, default: {} },
};

export const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, unique: true },
    plan: { type: String, default: "business" },
    settings: { type: SchemaTypes.Mixed, default: {} },
    ...metadataFields,
  },
  { collection: "organizations", timestamps },
);

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: String,
    locale: { type: String, default: "fa-IR" },
    preferences: { type: SchemaTypes.Mixed, default: {} },
    ...metadataFields,
  },
  { collection: "users", timestamps },
);

export const MembershipSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    userId: { type: SchemaTypes.ObjectId, required: true, index: true },
    roleIds: [{ type: SchemaTypes.ObjectId, ref: "Role" }],
    status: { type: String, enum: ["active", "invited", "disabled"], default: "active", index: true },
    joinedAt: Date,
    ...metadataFields,
  },
  { collection: "memberships", timestamps },
);

export const RoleSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    key: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    permissions: [{ type: String }],
    ...metadataFields,
  },
  { collection: "roles", timestamps },
);

const ProcessNodeSchema = new Schema(
  {
    nodeId: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    position: { x: Number, y: Number },
    formMapping: { type: SchemaTypes.Mixed, default: {} },
    dataSchema: { type: SchemaTypes.Mixed, default: {} },
    apiEvents: [{ type: SchemaTypes.Mixed }],
    generatedOutputs: { type: SchemaTypes.Mixed, default: {} },
    automationRules: [{ type: SchemaTypes.Mixed }],
    config: { type: SchemaTypes.Mixed, default: {} },
  },
  { _id: false },
);

const ProcessEdgeSchema = new Schema(
  {
    edgeId: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    condition: { type: SchemaTypes.Mixed },
    label: String,
  },
  { _id: false },
);

export const ProcessSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    key: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: String,
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
    latestVersionId: { type: SchemaTypes.ObjectId, index: true },
    tags: [{ type: String }],
    ownerUserId: { type: SchemaTypes.ObjectId, index: true },
    ...metadataFields,
  },
  { collection: "processes", timestamps },
);

export const ProcessVersionSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processId: { type: SchemaTypes.ObjectId, required: true, index: true },
    version: { type: Number, required: true },
    status: { type: String, enum: ["draft", "published", "deprecated"], default: "draft", index: true },
    nodes: { type: [ProcessNodeSchema], default: [] },
    edges: { type: [ProcessEdgeSchema], default: [] },
    variablesSchema: { type: SchemaTypes.Mixed, default: {} },
    generatedOutputs: {
      forms: [{ type: SchemaTypes.Mixed }],
      databaseCollections: [{ type: SchemaTypes.Mixed }],
      restApis: [{ type: SchemaTypes.Mixed }],
      mobileScreens: [{ type: SchemaTypes.Mixed }],
      taskInboxes: [{ type: SchemaTypes.Mixed }],
      documents: [{ type: SchemaTypes.Mixed }],
      analyticsDashboards: [{ type: SchemaTypes.Mixed }],
    },
    publishedAt: Date,
    ...metadataFields,
  },
  { collection: "process_versions", timestamps },
);

export const ProcessInstanceSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processVersionId: { type: SchemaTypes.ObjectId, required: true, index: true },
    businessKey: { type: String, index: true },
    status: { type: String, enum: ["running", "completed", "cancelled", "failed"], default: "running", index: true },
    variables: { type: SchemaTypes.Mixed, default: {} },
    activeNodeIds: [{ type: String }],
    timeline: [{ type: SchemaTypes.Mixed }],
    startedByUserId: { type: SchemaTypes.ObjectId, index: true },
    completedAt: Date,
    ...metadataFields,
  },
  { collection: "process_instances", timestamps },
);

export const TaskSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processInstanceId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processVersionId: { type: SchemaTypes.ObjectId, required: true, index: true },
    nodeId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed", "approved", "rejected", "cancelled"], default: "pending", index: true },
    assignedToUserId: { type: SchemaTypes.ObjectId, index: true },
    assignedToRoleId: { type: SchemaTypes.ObjectId, index: true },
    formId: { type: SchemaTypes.ObjectId, index: true },
    dueAt: { type: Date, index: true },
    slaMinutes: Number,
    completedAt: Date,
    ...metadataFields,
  },
  { collection: "tasks", timestamps },
);

const FormFieldSchema = new Schema(
  {
    fieldId: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: [{ type: SchemaTypes.Mixed }],
    mapping: { type: SchemaTypes.Mixed, default: {} },
    validation: { type: SchemaTypes.Mixed, default: {} },
    ui: { type: SchemaTypes.Mixed, default: {} },
  },
  { _id: false },
);

export const FormSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processId: { type: SchemaTypes.ObjectId, index: true },
    processVersionId: { type: SchemaTypes.ObjectId, index: true },
    key: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    fields: { type: [FormFieldSchema], default: [] },
    schema: { type: SchemaTypes.Mixed, default: {} },
    validationRules: { type: SchemaTypes.Mixed, default: {} },
    ...metadataFields,
  },
  { collection: "forms", timestamps },
);

export const FormSubmissionSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    formId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processInstanceId: { type: SchemaTypes.ObjectId, index: true },
    taskId: { type: SchemaTypes.ObjectId, index: true },
    submittedByUserId: { type: SchemaTypes.ObjectId, index: true },
    data: { type: SchemaTypes.Mixed, default: {} },
    validationSnapshot: { type: SchemaTypes.Mixed, default: {} },
    submittedAt: { type: Date, default: Date.now, index: true },
  },
  { collection: "form_submissions", timestamps },
);

export const DocumentTemplateSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processId: { type: SchemaTypes.ObjectId, index: true },
    key: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    engine: { type: String, default: "html-pdf" },
    template: { type: SchemaTypes.Mixed, required: true },
    variableMappings: { type: SchemaTypes.Mixed, default: {} },
    ...metadataFields,
  },
  { collection: "document_templates", timestamps },
);

export const GeneratedDocumentSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    documentTemplateId: { type: SchemaTypes.ObjectId, required: true, index: true },
    processInstanceId: { type: SchemaTypes.ObjectId, index: true },
    status: { type: String, enum: ["queued", "generated", "failed"], default: "queued", index: true },
    fileUrl: String,
    renderInput: { type: SchemaTypes.Mixed, default: {} },
    generatedAt: Date,
    error: String,
  },
  { collection: "generated_documents", timestamps },
);

export const WebhookSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    url: { type: String, required: true },
    events: [{ type: String }],
    secretHash: String,
    isActive: { type: Boolean, default: true, index: true },
    deliveryPolicy: { type: SchemaTypes.Mixed, default: {} },
    ...metadataFields,
  },
  { collection: "webhooks", timestamps },
);

export const ApiKeySchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    name: { type: String, required: true },
    keyHash: { type: String, required: true, index: true },
    scopes: [{ type: String }],
    rateLimit: { type: SchemaTypes.Mixed, default: {} },
    lastUsedAt: Date,
    expiresAt: Date,
    revokedAt: Date,
  },
  { collection: "api_keys", timestamps },
);

export const AuditLogSchema = new Schema(
  {
    organizationId: { type: SchemaTypes.ObjectId, required: true, index: true },
    actorUserId: { type: SchemaTypes.ObjectId, index: true },
    processInstanceId: { type: SchemaTypes.ObjectId, index: true },
    event: { type: String, required: true, index: true },
    entityType: { type: String, required: true, index: true },
    entityId: { type: String, required: true, index: true },
    payload: { type: SchemaTypes.Mixed, default: {} },
    occurredAt: { type: Date, default: Date.now, index: true },
  },
  { collection: "audit_logs", timestamps },
);

ProcessSchema.index({ organizationId: 1, key: 1 }, { unique: true });
ProcessVersionSchema.index({ processId: 1, version: 1 }, { unique: true });
RoleSchema.index({ organizationId: 1, key: 1 }, { unique: true });
MembershipSchema.index({ organizationId: 1, userId: 1 }, { unique: true });
FormSchema.index({ organizationId: 1, key: 1 }, { unique: true });
DocumentTemplateSchema.index({ organizationId: 1, key: 1 }, { unique: true });
TaskSchema.index({ organizationId: 1, status: 1, assignedToUserId: 1, dueAt: 1 });
TaskSchema.index({ organizationId: 1, status: 1, assignedToRoleId: 1, dueAt: 1 });
ProcessInstanceSchema.index({ organizationId: 1, status: 1, updatedAt: -1 });
AuditLogSchema.index({ organizationId: 1, occurredAt: -1 });

export const mongoModels = [
  { name: "Organization", schema: OrganizationSchema },
  { name: "User", schema: UserSchema },
  { name: "Membership", schema: MembershipSchema },
  { name: "Role", schema: RoleSchema },
  { name: "Process", schema: ProcessSchema },
  { name: "ProcessVersion", schema: ProcessVersionSchema },
  { name: "ProcessInstance", schema: ProcessInstanceSchema },
  { name: "Task", schema: TaskSchema },
  { name: "Form", schema: FormSchema },
  { name: "FormSubmission", schema: FormSubmissionSchema },
  { name: "DocumentTemplate", schema: DocumentTemplateSchema },
  { name: "GeneratedDocument", schema: GeneratedDocumentSchema },
  { name: "Webhook", schema: WebhookSchema },
  { name: "ApiKey", schema: ApiKeySchema },
  { name: "AuditLog", schema: AuditLogSchema },
];
