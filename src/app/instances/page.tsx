import { AlertTriangle, ArrowUpLeft, CheckCircle2, Clock3, Filter } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/ui";
import { getTasksForPage } from "@/lib/server-api";

export default async function InstancesPage() {
  const instances = await getTasksForPage();

  return (
    <AppShell>
      <div className="grid gap-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["در جریان", "۹۴۲", "blue", CheckCircle2],
            ["نیازمند اقدام", "۸۲", "amber", Clock3],
            ["متوقف", "۱۷", "red", AlertTriangle],
          ].map(([label, value, tone, Icon]) => {
            const Component = Icon as typeof CheckCircle2;
            return (
              <Card key={label as string} className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-600">{label as string}</p>
                    <p className="mt-3 text-3xl font-black text-slate-950">{value as string}</p>
                  </div>
                  <Badge tone={tone as "blue" | "amber" | "red"}>
                    <Component className="size-3.5" aria-hidden />
                    امروز
                  </Badge>
                </div>
              </Card>
            );
          })}
        </section>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">نمونه های قابل پیگیری</h2>
              <p className="mt-1 text-sm text-slate-500">اولویت بندی بر اساس مهلت، وضعیت و گام فعلی.</p>
            </div>
            <Button variant="secondary">
              <Filter className="size-4" aria-hidden />
              فیلتر پیشرفته
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                <tr>
                  <th className="px-5 py-3">شناسه</th>
                  <th className="px-5 py-3">عنوان</th>
                  <th className="px-5 py-3">فرایند</th>
                  <th className="px-5 py-3">مسئول فعلی</th>
                  <th className="px-5 py-3">گام فعلی</th>
                  <th className="px-5 py-3">وضعیت</th>
                  <th className="px-5 py-3">مهلت</th>
                  <th className="px-5 py-3">جزئیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {instances.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40">
                    <td className="px-5 py-4 font-black text-blue-700">{item.id}</td>
                    <td className="px-5 py-4 font-bold text-slate-950">{item.title}</td>
                    <td className="px-5 py-4 text-slate-600">{item.process}</td>
                    <td className="px-5 py-4 text-slate-600">{item.assignee}</td>
                    <td className="px-5 py-4 text-slate-600">{item.step}</td>
                    <td className="px-5 py-4">
                      <Badge tone={item.status === "نیازمند اقدام" ? "amber" : item.status === "متوقف" ? "red" : "blue"}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800">{item.due}</td>
                    <td className="px-5 py-4">
                      <Button variant="secondary" className="min-h-9 rounded-xl px-3">
                        مشاهده
                        <ArrowUpLeft className="size-4" aria-hidden />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-black text-slate-950">خط زمانی نمونه PR-1048</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            {["ثبت درخواست", "تایید مدیر", "تایید مالی", "صدور سفارش"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className={`grid size-9 place-items-center rounded-2xl text-sm font-black ${
                    index < 2 ? "bg-emerald-100 text-emerald-700" : index === 2 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {index + 1}
                  </span>
                  <p className="font-black text-slate-950">{step}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {index < 2 ? "تکمیل شده" : index === 2 ? "در حال انجام" : "در انتظار"}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
