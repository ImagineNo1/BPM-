import { Braces, CheckCircle2, Copy, KeyRound, Play, ShieldCheck, Webhook } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ApiBarChart } from "@/components/dashboard-charts";
import { Badge, Button, Card } from "@/components/ui";
import { endpoints } from "@/lib/mock-data";

export default function ApiGeneratorPage() {
  return (
    <AppShell>
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid min-w-0 gap-6">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50/60 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">Endpoint های تولید شده</h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">بر اساس فرایند خرید سازمانی و فرم متصل.</p>
                </div>
                <Button>
                  <Play className="size-4" aria-hidden />
                  اجرای تست
                </Button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {endpoints.map((endpoint) => (
                <div key={endpoint.path} className="grid gap-3 p-5 transition hover:bg-blue-50/35 lg:grid-cols-[120px_minmax(0,1fr)_auto] lg:items-center">
                  <Badge tone={endpoint.method === "GET" ? "blue" : endpoint.method === "PATCH" ? "amber" : "purple"}>
                    {endpoint.method}
                  </Badge>
                  <div className="min-w-0">
                    <p className="font-black text-slate-950">{endpoint.label}</p>
                    <code className="mt-2 block overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-xs font-bold text-slate-700" dir="ltr">
                      {endpoint.path}
                    </code>
                  </div>
                  <Button variant="secondary" className="min-h-10 rounded-xl">
                    <Copy className="size-4" aria-hidden />
                    کپی
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-black text-slate-950">نمونه Payload</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">ساختار درخواست شروع فرایند.</p>
              </div>
              <Badge tone="green">
                <CheckCircle2 className="size-3.5" aria-hidden />
                معتبر
              </Badge>
            </div>
            <div className="p-6">
              <div className="overflow-hidden rounded-2xl border border-slate-800/80 code-block">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2" dir="ltr">
                    <span className="size-2.5 rounded-full bg-rose-400" />
                    <span className="size-2.5 rounded-full bg-amber-300" />
                    <span className="size-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-black text-blue-100/70">request.json</span>
                </div>
                <pre className="max-w-full overflow-x-auto p-5 text-left text-[13px] font-bold leading-7 text-blue-50" dir="ltr">
{`{
  "processKey": "purchase-request",
  "requestTitle": "Network equipment",
  "costCenter": "IT Operations",
  "amount": 680000000,
  "vendor": "Sepehr Data",
  "attachments": ["quote-1403.pdf"]
}`}
                </pre>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-950">محیط تست خالی</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">هنوز هیچ اجرای تستی ثبت نشده است.</p>
              </div>
              <Badge tone="slate">Sandbox</Badge>
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center">
              <Play className="mx-auto size-7 text-blue-600" aria-hidden />
              <p className="mt-3 text-sm font-black text-slate-950">برای دیدن پاسخ نمونه، اجرای تست را بزنید</p>
              <p className="mt-1 text-xs font-medium leading-6 text-slate-500">نتیجه تست، زمان پاسخ و خطاها در همین بخش نمایش داده می شوند.</p>
            </div>
          </Card>
        </div>

        <div className="grid min-w-0 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-black text-slate-950">وضعیت سرویس ها</h2>
            <div className="mt-5">
              <ApiBarChart />
            </div>
          </Card>

          <Card className="p-6">
            <div className="grid gap-4">
              {[
                ["احراز هویت", "OAuth2 Client Credentials", KeyRound, "blue"],
                ["سطح دسترسی", "Process Admin و Integration", ShieldCheck, "green"],
                ["Webhook", "ارسال رویداد task.completed", Webhook, "purple"],
                ["Schema", "OpenAPI 3.1 آماده خروجی", Braces, "amber"],
              ].map(([title, desc, Icon, tone]) => {
                const Component = Icon as typeof KeyRound;
                return (
                  <div key={title as string} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40">
                    <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                      <Component className="size-5" aria-hidden />
                    </span>
                    <div>
                      <Badge tone={tone as "blue" | "green" | "purple" | "amber"}>{title as string}</Badge>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{desc as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
