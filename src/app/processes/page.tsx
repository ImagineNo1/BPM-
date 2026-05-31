import { ArrowUpLeft, Filter, MoreHorizontal, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, LinkButton } from "@/components/ui";
import { getProcessesForPage } from "@/lib/server-api";

export default async function ProcessesPage() {
  const processes = await getProcessesForPage();

  return (
    <AppShell>
      <div className="grid gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {["همه", "منتشر شده", "در بازبینی", "پیش نویس", "آرشیو"].map((tab, index) => (
              <button
                key={tab}
                className={`min-h-10 rounded-2xl px-4 text-sm font-bold transition ${
                  index === 0
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Filter className="size-4" aria-hidden />
              فیلتر
            </Button>
            <LinkButton href="/designer">
              <Plus className="size-4" aria-hidden />
              فرایند جدید
            </LinkButton>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="grid border-b border-slate-200 bg-white p-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-950">فهرست فرایندهای سازمان</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">هر ردیف یک فرایند قابل باز کردن در طراح بصری است.</p>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 lg:mt-0">
              میانگین سلامت SLA در این کتابخانه <span className="font-black text-slate-950">۹۳.۷٪</span> است.
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                <tr>
                  <th className="px-5 py-3">فرایند</th>
                  <th className="px-5 py-3">مالک</th>
                  <th className="px-5 py-3">وضعیت</th>
                  <th className="px-5 py-3">نسخه</th>
                  <th className="px-5 py-3">نمونه فعال</th>
                  <th className="px-5 py-3">SLA</th>
                  <th className="px-5 py-3">آخرین تغییر</th>
                  <th className="px-5 py-3">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processes.map((process) => (
                  <tr key={process.name} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-4">
                      <div className="font-black text-slate-950">{process.name}</div>
                      <div className="mt-1 text-xs text-slate-500">شناسه مدل: BPM-{process.instances}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{process.owner}</td>
                    <td className="px-5 py-4">
                      <Badge tone={process.status === "منتشر شده" ? "green" : process.status === "در بازبینی" ? "amber" : "slate"}>
                        {process.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-700">{process.version}</td>
                    <td className="px-5 py-4 text-slate-600">{process.instances}</td>
                    <td className="px-5 py-4 font-black text-slate-950">{process.sla}</td>
                    <td className="px-5 py-4 text-slate-600">{process.updated}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <LinkButton href="/designer" variant="secondary" className="min-h-9 rounded-xl px-3">
                          باز کردن
                          <ArrowUpLeft className="size-4" aria-hidden />
                        </LinkButton>
                        <Button variant="ghost" className="size-9 rounded-xl px-0" aria-label="گزینه های بیشتر">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
