# BPM Studio Architecture

BPM Studio is a Persian RTL Business Process Operating System. The process model is the source of truth: a published process version should eventually generate runtime forms, database/schema definitions, REST APIs, task inboxes, document/PDF outputs, analytics dashboards, webhook events, and mobile-friendly runtime screens.

## Current Repository Shape

The polished Next.js frontend prototype currently remains at the repository root to avoid UI breakage during backend foundation work. The production target is a monorepo:

```text
apps/
  web/                 Future home for the existing Next.js App Router UI
  api/                 NestJS REST API
packages/
  ui/                  Future extracted Persian RTL design system
  shared/              Zod schemas, shared types, domain events
  workflow-engine/     Process execution interfaces and engine implementation
  form-engine/         Runtime form validation and variable mapping
  api-generator/       Generated runtime API and OpenAPI planning
  document-engine/     PDF/template generation contracts and jobs
apps/api/src/database/
  mongo-models.ts      MongoDB collections, embedded document schemas, indexes
  seed.ts              Development seed data
docs/
  architecture.md
```

## Backend Boundaries

### API App

`apps/api` is a NestJS application. It exposes initial REST endpoints for organizations, processes, runtime execution, forms, and audit logs. Auth is intentionally mocked for now through request context defaults, because production auth is a later milestone.

### Shared Package

`@bpm-studio/shared` owns cross-app contracts:

- process node types
- process, task, and instance statuses
- form field types
- domain event names
- Zod validation schemas for initial DTOs

### Workflow Engine

`@bpm-studio/workflow-engine` defines the workflow execution contract. The first implementation is a placeholder that validates definitions and emits domain events. A production implementation should:

- load a published process version
- evaluate nodes and edges
- create tasks for user and approval nodes
- execute service/document/notification jobs through BullMQ
- update active nodes and process variables
- append audit logs for every state change

### Form Engine

`@bpm-studio/form-engine` defines schema-based runtime forms. It validates submissions, maps submitted data into process variables, and will later power generated web/mobile form screens.

### API Generator

`@bpm-studio/api-generator` defines generated API plans per process. Every published process should eventually expose:

- `POST /runtime/processes/:processKey/start`
- `GET /runtime/instances/:instanceId`
- `POST /runtime/tasks/:taskId/complete`
- `POST /runtime/tasks/:taskId/approve`
- `POST /runtime/tasks/:taskId/reject`

The package also models OpenAPI generation, API key authentication, webhook events, and per-organization rate limiting.

### Document Engine

`@bpm-studio/document-engine` defines document template mappings and PDF generation jobs. Production PDF generation should run asynchronously and store generated files through an object storage adapter.

## Data Model

MongoDB is the system of record because the platform is process-centric and document-centric. NestJS uses Mongoose models for production persistence, while the current services still run in-memory until repositories are introduced. Collections cover:

- `organizations`
- `users`
- `memberships`
- `roles`
- `processes`
- `process_versions`
- `process_instances`
- `tasks`
- `forms`
- `form_submissions`
- `document_templates`
- `generated_documents`
- `webhooks`
- `api_keys`
- `audit_logs`

Embedded documents are preferred where they improve execution speed and developer productivity:

- `process_versions` embeds nodes, edges, variable schemas, and generated-output manifests.
- `forms` embeds fields, UI metadata, mappings, and validation rules.
- `process_instances` embeds runtime variables, active node ids, and compact timeline data.
- `tasks` stores direct assignment, SLA, form, and node references for fast inbox queries.
- `audit_logs` stores payload snapshots instead of requiring joins at read time.

References are still used for tenant boundaries and high-cardinality runtime records: organization, process, process version, instance, task, form, user, and role ids. This avoids excessive normalization while preserving queryable boundaries.

Initial indexes prioritize workflow execution:

- organization-scoped unique keys for processes, roles, forms, and document templates
- published/draft lookups on process versions
- task inbox lookups by organization, status, assignee, role, and due date
- instance tracking by organization, status, and update time
- audit timelines by organization and occurrence time

## Process Definition

A process definition contains:

- `start_event`
- `user_task`
- `approval_task`
- `service_task`
- `condition_gateway`
- `document_generation_task`
- `notification_task`
- `end_event`

Draft and published versions are stored separately in `ProcessVersion`. Runtime instances always point to an immutable published process version.

## Queues and Events

Redis and BullMQ should back these queues:

- `workflow.execution`
- `document.generation`
- `notification.delivery`
- `webhook.delivery`
- `analytics.aggregation`

Domain event names:

- `process.started`
- `process.completed`
- `task.created`
- `task.completed`
- `task.approved`
- `task.rejected`
- `form.submitted`
- `document.generated`
- `webhook.delivered`
- `webhook.failed`

## Auth and Tenancy

Production auth should support JWT/session-based user auth plus API-key auth for generated process APIs. Current API code uses mocked organization context so the domain can develop before auth hardening.

Every multi-tenant collection includes `organizationId`; runtime queries must always scope by organization. API keys carry organization-level scopes and rate-limit metadata.

## Implementation Milestones

1. Backend foundation with mocked context, in-memory services, MongoDB/Mongoose schemas, Docker Compose, and Swagger.
2. Replace in-memory services with Mongoose repositories, query indexes, and seed data.
3. Implement auth, memberships, RBAC permission checks, and API-key authentication.
4. Implement workflow execution with BullMQ and persisted audit trails.
5. Generate runtime APIs and OpenAPI documents from published process versions.
6. Generate runtime forms, task inbox screens, PDF jobs, and analytics dashboards.
7. Move the frontend prototype into `apps/web` and extract reusable UI into `packages/ui`.
