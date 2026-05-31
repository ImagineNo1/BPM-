import {
  BarChart3,
  Bot,
  Braces,
  CheckCircle2,
  ClipboardList,
  Database,
  FileText,
  Inbox,
  Layers3,
  Save,
  Settings2,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BpmCanvas } from "@/components/bpm-canvas";
import { Badge, Button, Card } from "@/components/ui";
import { getDesignerProcess } from "@/lib/server-api";

const generatedCapabilities = [
  { label: "Forms", value: "۳", desc: "فرم های وب و موبایل", icon: ClipboardList, tone: "blue" },
  { label: "Database schema", value: "۱۲", desc: "جدول و فیلد عملیاتی", icon: Database, tone: "green" },
  { label: "REST APIs", value: "۸", desc: "Endpoint و Webhook", icon: Braces, tone: "purple" },
  { label: "Mobile screens", value: "۵", desc: "ورود، تایید، پیگیری", icon: Smartphone, tone: "blue" },
  { label: "Task inboxes", value: "۴", desc: "صف وظیفه برای نقش ها", icon: Inbox, tone: "amber" },
  { label: "PDF documents", value: "۲", desc: "درخواست و سفارش خرید", icon: FileText, tone: "slate" },
  { label: "Analytics", value: "۴", desc: "داشبورد SLA و هزینه", icon: BarChart3, tone: "green" },
];

const mappings = [
  {
    title: "Form mapping",
    icon: ClipboardList,
    items: ["فیلد مبلغ به amount", "مرکز هزینه به costCenter", "پیوست پیش فاکتور اجباری"],
    tone: "blue",
  },
  {
    title: "Data schema",
    icon: Database,
    items: ["PurchaseRequest.amount:number", "ApprovalDecision.status:enum", "AuditLog.actorId:uuid"],
    tone: "green",
  },
  {
    title: "API events",
    icon: Braces,
    items: ["PATCH /tasks/{id}/complete", "finance.approved", "finance.rejected"],
    tone: "purple",
  },
  {
    title: "Generated outputs",
    icon: Layers3,
    items: ["Finance Inbox screen", "Purchase approval PDF", "SLA dashboard tile"],
    tone: "amber",
  },
  {
    title: "Automation rules",
    icon: Bot,
    items: ["اگر مبلغ > ۵۰۰ میلیون، تایید مالی اجباری", "تاخیر ۸ ساعت، اعلان به مالک", "رد مالی، بازگشت به درخواست کننده"],
    tone: "slate",
  },
];

const toneStyles = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100",
  amber: "bg-amber-50 text-amber-800 border-amber-100",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
};

export default async function DesignerPage() {
  const process = await getDesignerProcess();
  const latestVersion = process?.versions?.at(-1)?.version ?? "v3.2";

  return (
    <AppShell>
      <div className="grid gap-7">
        <Card className="dark-panel overflow-hidden text-white">
          <div className="grid gap-5 p-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-blue-100 ring-1 ring-white/10">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <div>
                  <Badge tone="blue" className="border-blue-300/30 bg-blue-400/12 text-blue-50">
                    Business Operating System
                  </Badge>
                  <h2 className="mt-2 text-2xl font-black">هر فرایند، یک سیستم کسب و کار کامل تولید می کند</h2>
                </div>
              </div>
              <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-blue-50/78">
                این بوم فقط ترتیب کارها را نشان نمی دهد. هر گره، فرم، داده، API، صفحه موبایل، صف وظیفه،
                سند PDF و داشبورد خودش را می سازد تا عملیات سازمان از یک مدل واحد اجرا شود.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["۳۲", "خروجی"],
                ["۷", "سطح محصول"],
                ["۱", "مدل مرکزی"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3">
                  <p className="persian-number text-2xl font-black">{value}</p>
                  <p className="mt-1 text-xs font-bold text-blue-50/68">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {generatedCapabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <Card key={capability.label} className="p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`grid size-10 place-items-center rounded-2xl border ${
                      toneStyles[capability.tone as keyof typeof toneStyles]
                    }`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="persian-number text-xl font-black text-slate-950">{capability.value}</span>
                </div>
                <p className="mt-2 text-sm font-black text-slate-950">{capability.label}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{capability.desc}</p>
              </Card>
            );
          })}
        </section>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 panel-shadow md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="green">
              <CheckCircle2 className="size-3.5" aria-hidden />
              سیستم قابل انتشار
            </Badge>
            <Badge tone="blue">نسخه {latestVersion}</Badge>
            <Badge tone="purple">خرید سازمانی</Badge>
            <Badge tone="amber">Finance node selected</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Settings2 className="size-4" aria-hidden />
              تنظیم تولید خروجی
            </Button>
            <Button>
              <Save className="size-4" aria-hidden />
              انتشار سیستم
            </Button>
          </div>
        </div>

        <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0">
            <BpmCanvas />
          </div>

          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50/70 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">گره انتخاب شده: تایید مالی</h2>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                    این گره همزمان فرم تصمیم، جدول داده، API، Inbox، PDF و KPI مالی تولید می کند.
                  </p>
                </div>
                <span className="grid size-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
                  <Zap className="size-5" aria-hidden />
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {mappings.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.title} className="rounded-2xl border border-white/80 bg-white/82 p-2 text-center shadow-sm">
                      <Icon className="mx-auto size-4 text-blue-600" aria-hidden />
                      <p className="mt-1 text-[10px] font-black leading-4 text-slate-700">{section.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 p-5">
              {mappings.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-9 place-items-center rounded-2xl border ${
                          toneStyles[section.tone as keyof typeof toneStyles]
                        }`}
                      >
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <h3 className="text-sm font-black text-slate-950">{section.title}</h3>
                    </div>
                    <div className="mt-3 grid gap-1.5">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5">
                          <span className="size-1.5 rounded-full bg-blue-600" />
                          <span className="text-xs font-bold leading-5 text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
