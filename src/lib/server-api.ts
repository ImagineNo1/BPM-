import { instances as mockInstances, processes as mockProcesses } from "@/lib/mock-data";

const API_BASE_URL = process.env.BPM_API_URL ?? "http://127.0.0.1:4000";

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

type ApiProcess = {
  id: string;
  name: string;
  key: string;
  description?: string;
  versions?: Array<{ id: string; version: string; status: string; definition?: unknown }>;
};

type ApiTask = {
  id: string;
  title: string;
  status: string;
  nodeId: string;
  processInstanceId: string;
};

export async function getProcessesForPage() {
  const apiProcesses = await safeFetch<ApiProcess[]>("/processes");

  if (!apiProcesses?.length) {
    return mockProcesses;
  }

  return apiProcesses.map((process) => ({
    name: process.name,
    owner: "سیستم عامل کسب و کار",
    status: process.versions?.some((version) => version.status === "published") ? "منتشر شده" : "پیش نویس",
    version: process.versions?.at(-1)?.version ?? "v1",
    instances: "۰",
    sla: "۹۶٪",
    updated: "از API",
  }));
}

export async function getTasksForPage() {
  const apiTasks = await safeFetch<ApiTask[]>("/runtime/tasks");

  if (!apiTasks?.length) {
    return mockInstances;
  }

  return apiTasks.map((task) => ({
    id: task.id,
    title: task.title,
    process: "درخواست خرید سازمانی",
    assignee: "نقش عملیاتی",
    step: task.nodeId,
    status: task.status === "pending" ? "نیازمند اقدام" : "در جریان",
    due: "SLA فعال",
  }));
}

export async function getDesignerProcess() {
  return safeFetch<ApiProcess>("/processes/proc_purchase");
}
