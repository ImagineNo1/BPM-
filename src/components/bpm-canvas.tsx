"use client";

import {
  BarChart3,
  Braces,
  ClipboardList,
  Database,
  FileText,
  Inbox,
  Smartphone,
  Zap,
} from "lucide-react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";

type ArtifactKey = "form" | "schema" | "api" | "mobile" | "task" | "pdf" | "analytics";

type BusinessNodeData = {
  title: string;
  subtitle: string;
  artifacts: ArtifactKey[];
  selected?: boolean;
  tone: "blue" | "purple" | "green" | "amber" | "slate";
};

const artifactMeta: Record<ArtifactKey, { label: string; icon: typeof ClipboardList }> = {
  form: { label: "فرم", icon: ClipboardList },
  schema: { label: "داده", icon: Database },
  api: { label: "API", icon: Braces },
  mobile: { label: "موبایل", icon: Smartphone },
  task: { label: "وظیفه", icon: Inbox },
  pdf: { label: "PDF", icon: FileText },
  analytics: { label: "تحلیل", icon: BarChart3 },
};

const toneClass = {
  blue: "border-blue-200 bg-blue-50/95 text-blue-700",
  purple: "border-purple-200 bg-purple-50/95 text-purple-700",
  green: "border-emerald-200 bg-emerald-50/95 text-emerald-700",
  amber: "border-amber-200 bg-amber-50/95 text-amber-800",
  slate: "border-slate-200 bg-slate-50/95 text-slate-700",
};

const nodes: Node<BusinessNodeData>[] = [
  {
    id: "start",
    type: "business",
    position: { x: 560, y: 132 },
    data: {
      title: "شروع درخواست خرید",
      subtitle: "ورودی وب و موبایل",
      artifacts: ["form", "schema", "api", "mobile"],
      tone: "blue",
    },
  },
  {
    id: "intake",
    type: "business",
    position: { x: 320, y: 132 },
    data: {
      title: "ثبت اطلاعات درخواست",
      subtitle: "فرم، جدول و اعتبارسنجی",
      artifacts: ["form", "schema", "api"],
      tone: "purple",
    },
  },
  {
    id: "manager",
    type: "business",
    position: { x: 80, y: 48 },
    data: {
      title: "تایید مدیر مستقیم",
      subtitle: "Inbox و اعلان",
      artifacts: ["task", "mobile", "api", "analytics"],
      tone: "green",
    },
  },
  {
    id: "finance",
    type: "business",
    position: { x: 80, y: 228 },
    data: {
      title: "تایید مالی",
      subtitle: "گره انتخاب شده",
      artifacts: ["form", "schema", "api", "task", "pdf", "analytics"],
      selected: true,
      tone: "amber",
    },
  },
  {
    id: "purchase",
    type: "business",
    position: { x: -174, y: 138 },
    data: {
      title: "صدور سفارش خرید",
      subtitle: "سند و رویداد خروجی",
      artifacts: ["api", "pdf", "analytics"],
      tone: "purple",
    },
  },
  {
    id: "close",
    type: "business",
    position: { x: -420, y: 138 },
    data: {
      title: "بستن پرونده",
      subtitle: "داشبورد و آرشیو",
      artifacts: ["schema", "pdf", "analytics"],
      tone: "slate",
    },
  },
];

const edges: Edge[] = [
  edge("start", "intake"),
  edge("intake", "manager"),
  edge("intake", "finance", "مبلغ بالا"),
  edge("manager", "purchase"),
  edge("finance", "purchase", "تایید شد"),
  edge("purchase", "close"),
];

function edge(source: string, target: string, label?: string): Edge {
  return {
    id: `${source}-${target}`,
    source,
    target,
    label,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#334155" },
    style: { stroke: "#334155", strokeWidth: 2.4 },
    labelStyle: { fill: "#1f2937", fontWeight: 900, fontSize: 12 },
    labelBgStyle: { fill: "#ffffff", fillOpacity: 0.94 },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 10,
  };
}

function BusinessNode({ data }: NodeProps<BusinessNodeData>) {
  return (
    <div
      className={`min-w-[214px] rounded-[22px] border p-3.5 shadow-[0_20px_42px_rgba(15,23,42,0.13),0_1px_0_rgba(255,255,255,0.9)_inset] ${toneClass[data.tone]} ${
        data.selected ? "ring-4 ring-blue-500/18" : ""
      }`}
    >
      <Handle type="target" position={Position.Right} className="!size-2.5 !border-2 !border-white !bg-slate-500" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">{data.title}</p>
          <p className="mt-1 text-[11px] font-extrabold text-slate-500">{data.subtitle}</p>
        </div>
        {data.selected ? (
          <span className="grid size-8 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
            <Zap className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {data.artifacts.map((artifact) => {
          const Icon = artifactMeta[artifact].icon;
          return (
            <span
              key={artifact}
              className="inline-flex items-center gap-1 rounded-xl border border-white/70 bg-white/84 px-2 py-1 text-[10px] font-black text-slate-700 shadow-sm"
            >
              <Icon className="size-3" aria-hidden />
              {artifactMeta[artifact].label}
            </span>
          );
        })}
      </div>
      <Handle type="source" position={Position.Left} className="!size-2.5 !border-2 !border-white !bg-slate-500" />
    </div>
  );
}

const nodeTypes = { business: BusinessNode };

export function BpmCanvas() {
  return (
    <div className="relative h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white grid-texture shadow-[0_24px_54px_rgba(15,23,42,0.08)]">
      <div className="pointer-events-none absolute right-5 top-5 z-10 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <p className="text-xs font-black text-slate-950">Business OS: خرید سازمانی</p>
        <p className="mt-1 text-[11px] font-bold text-slate-500">۶ گره، ۳۲ خروجی تولیدی</p>
      </div>
      <div className="pointer-events-none absolute bottom-5 right-5 z-10 grid grid-cols-2 gap-2 rounded-2xl border border-slate-200/80 bg-white/88 p-3 shadow-sm backdrop-blur md:grid-cols-4">
        {[
          ["فرم", "۳"],
          ["API", "۸"],
          ["Screen", "۵"],
          ["Dashboard", "۴"],
        ].map(([label, value]) => (
          <div key={label} className="min-w-16 rounded-xl bg-slate-50 px-3 py-2 text-center">
            <p className="persian-number text-sm font-black text-slate-950">{value}</p>
            <p className="text-[10px] font-bold text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#dbe5f3" gap={32} />
        <MiniMap
          pannable
          zoomable
          nodeColor="#2457ff"
          maskColor="rgba(245,247,251,.74)"
          className="!rounded-2xl !border !border-slate-200 !bg-white/90 !shadow-lg"
        />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
