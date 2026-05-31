# BPM Studio

Premium Persian RTL SaaS prototype and backend foundation for a Business Process Operating System.

The current web prototype remains at the repository root to preserve the polished UI. The backend foundation and domain packages are now structured as a monorepo around it.

## Structure

```text
apps/api                 NestJS backend API foundation
packages/shared          Shared Zod schemas, enums, and DTO types
packages/workflow-engine Workflow execution interfaces and placeholder engine
packages/form-engine     Runtime form validation and variable mapping interfaces
packages/api-generator   Generated runtime API/OpenAPI planning interfaces
packages/document-engine Document/PDF generation interfaces
packages/ui              Reserved for extracting the Persian RTL UI system
apps/api/src/database    MongoDB/Mongoose schemas and seed script
docs/architecture.md     System architecture and roadmap
src/                     Existing Next.js frontend prototype
```

## Prerequisites

- Node.js 20+
- Docker Desktop for MongoDB and Redis

## Install

```bash
npm install
```

## Run Infrastructure

```bash
docker compose up -d
```

Copy `.env.example` to `.env` and adjust values if needed.

## Database

```bash
npm run db:seed
```

The API currently uses in-memory services for safe incremental development. MongoDB/Mongoose schemas define the production persistence direction, and the API connects to MongoDB when `MONGODB_URI` is present.

## Run Web Prototype

```bash
npm run dev
```

Web runs on [http://localhost:3000](http://localhost:3000).

If the API is running, selected pages will try to read from it. If not, they safely fall back to existing mock data.

## Run API

```bash
npm run dev:api
```

API runs on [http://localhost:4000](http://localhost:4000).

Swagger/OpenAPI docs are available at:

```text
http://localhost:4000/docs
```

## Implemented API Endpoints

Organizations:

- `GET /organizations`
- `POST /organizations`

Processes:

- `GET /processes`
- `POST /processes`
- `GET /processes/:id`
- `POST /processes/:id/versions`
- `POST /processes/:id/publish`

Runtime:

- `POST /runtime/processes/:processId/start`
- `GET /runtime/instances/:id`
- `GET /runtime/tasks`
- `POST /runtime/tasks/:id/complete`
- `POST /runtime/tasks/:id/approve`
- `POST /runtime/tasks/:id/reject`

Forms:

- `GET /forms`
- `POST /forms`
- `POST /forms/:id/submit`

Audit:

- `GET /audit-logs`

## Notes

- Auth is intentionally mocked for now.
- Persistence services are intentionally in-memory for the first backend foundation.
- MongoDB schemas, Docker Compose, and seed data define the production database direction.
- The existing Persian RTL UI is preserved.
