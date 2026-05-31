export type GeneratedRuntimeRoute = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  operationId: string;
  description: string;
};

export type ApiGenerationPlan = {
  processKey: string;
  routes: GeneratedRuntimeRoute[];
  webhookEvents: string[];
  rateLimitKey: string;
  authMode: "api_key" | "jwt" | "session";
};

export interface ApiGenerator {
  planProcessApi(processKey: string): ApiGenerationPlan;
  generateOpenApi(plan: ApiGenerationPlan): Record<string, unknown>;
}

export class PlaceholderApiGenerator implements ApiGenerator {
  planProcessApi(processKey: string): ApiGenerationPlan {
    return {
      processKey,
      authMode: "api_key",
      rateLimitKey: `org:${processKey}:runtime`,
      webhookEvents: ["process.started", "task.completed", "process.completed"],
      routes: [
        {
          method: "POST",
          path: `/runtime/processes/${processKey}/start`,
          operationId: `${processKey}.start`,
          description: "Start a process instance.",
        },
        {
          method: "GET",
          path: "/runtime/instances/{instanceId}",
          operationId: `${processKey}.getInstance`,
          description: "Read a process instance.",
        },
        {
          method: "POST",
          path: "/runtime/tasks/{taskId}/complete",
          operationId: `${processKey}.completeTask`,
          description: "Complete a runtime task.",
        },
      ],
    };
  }

  generateOpenApi(plan: ApiGenerationPlan) {
    return {
      openapi: "3.1.0",
      info: { title: `${plan.processKey} Runtime API`, version: "0.1.0" },
      paths: Object.fromEntries(
        plan.routes.map((route) => [
          route.path,
          {
            [route.method.toLowerCase()]: {
              operationId: route.operationId,
              description: route.description,
              security: [{ ApiKeyAuth: [] }],
            },
          },
        ]),
      ),
    };
  }
}
