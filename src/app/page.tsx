import { Activity, AlertTriangle, ArrowUpLeft, CheckCircle2, Clock3 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Card, LinkButton } from "@/components/ui";
import { MixChart, ThroughputChart } from "@/components/dashboard-charts";
import { instances, metrics, processes } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid gap-7">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="group overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(15,23,42,0.11)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-600">{metric.label}</p>
                    <p className="persian-number mt-3 text-[2.15rem] font-black leading-none text-slate-950">{metric.value}</p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium leading-6 text-slate-500">{metric.change}</p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-l from-blue-600 to-purple-500" />
                </div>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.75fr)]">
          <Card className="p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">توان عملیاتی هفته</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">مقایسه نمونه های تکمیل شده با موارد دارای تاخیر.</p>
              </div>
              <Badge tone="green">
                <CheckCircle2 className="size-3.5" aria-hidden />
                ۹۴٪ در محدوده SLA
              </Badge>
            </div>
            <div className="mt-6">
              <ThroughputChart />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-black text-slate-950">ترکیب فرایندها</h2>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-500">سهم واحدها از اجرای فرایندهای فعال.</p>
            <div className="mt-6">
              <MixChart />
            </div>
            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/55 p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                  <AlertTriangle className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-black text-slate-900">۸۲ نمونه نزدیک به SLA</p>
                  <p className="mt-1 text-xs font-medium text-amber-900/70">اولویت با تایید مالی و بازبینی حقوقی است.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-950">فرایندهای اولویت دار</h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">نمای سریع وضعیت انتشار و سلامت اجرا.</p>
                </div>
                <LinkButton href="/processes" variant="secondary">
                  مشاهده همه
                  <ArrowUpLeft className="size-4" aria-hidden />
                </LinkButton>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-right text-sm">
                <thead className="bg-slate-50/80 text-xs font-black text-slate-500">
                  <tr>
                    <th className="px-5 py-3">نام فرایند</th>
                    <th className="px-5 py-3">مالک</th>
                    <th className="px-5 py-3">وضعیت</th>
                    <th className="px-5 py-3">نسخه</th>
                    <th className="px-5 py-3">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {processes.slice(0, 4).map((process) => (
                    <tr key={process.name} className="hover:bg-blue-50/40">
                      <td className="px-5 py-4 font-black text-slate-950">{process.name}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{process.owner}</td>
                      <td className="px-5 py-4">
                        <Badge tone={process.status === "منتشر شده" ? "green" : process.status === "در بازبینی" ? "amber" : "slate"}>
                          {process.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{process.version}</td>
                      <td className="persian-number px-5 py-4 font-black text-slate-950">{process.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-black text-slate-950">کارهای امروز</h2>
            <div className="mt-5 grid gap-3">
              {instances.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.title}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{item.step} برای {item.assignee}</p>
                    </div>
                    <Badge tone={item.status === "نیازمند اقدام" ? "amber" : item.status === "متوقف" ? "red" : "blue"}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Clock3 className="size-4" aria-hidden />
                    مهلت: {item.due}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card className="dark-panel overflow-hidden text-white">
          <div className="grid gap-5 p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/10">
                  <Activity className="size-5" aria-hidden />
                </span>
                <h2 className="text-xl font-black">بوم خرید سازمانی آماده ویرایش است</h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-50/78">
                نسخه اولیه فرایند شامل فرم، تصمیم مبلغ، تایید مالی، تولید سند و Endpoint شروع نمونه است.
              </p>
            </div>
            <LinkButton href="/designer" variant="secondary">
              باز کردن طراح BPM
              <ArrowUpLeft className="size-4" aria-hidden />
            </LinkButton>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
