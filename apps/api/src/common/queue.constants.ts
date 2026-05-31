export const queueNames = {
  workflowExecution: "workflow.execution",
  documentGeneration: "document.generation",
  notificationDelivery: "notification.delivery",
  webhookDelivery: "webhook.delivery",
  analyticsAggregation: "analytics.aggregation",
} as const;

export type QueueName = (typeof queueNames)[keyof typeof queueNames];
