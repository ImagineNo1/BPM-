import { Download, Eye, FileText, Printer, RefreshCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/ui";

export default function DocumentsPage() {
  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-6">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <FileText className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-black text-slate-950">قالب سند</h2>
                <p className="mt-1 text-sm text-slate-500">خروجی درخواست خرید</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["شماره سند", "DOC-PR-1048"],
                ["فرایند", "درخواست خرید سازمانی"],
                ["قالب", "PurchaseRequest.pdf"],
                ["زبان", "فارسی RTL"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="secondary">
                <RefreshCcw className="size-4" aria-hidden />
                بازسازی
              </Button>
              <Button>
                <Download className="size-4" aria-hidden />
                دریافت
              </Button>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-black text-slate-950">کنترل خروجی</h2>
            <div className="mt-4 grid gap-3">
              {["هدر رسمی سازمان", "امضای دیجیتال", "پیوست پیش فاکتور", "شماره گذاری صفحات"].map((item) => (
                <label key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                  <input type="checkbox" defaultChecked className="size-5 accent-blue-600" />
                </label>
              ))}
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">پیش نمایش PDF</h2>
              <p className="mt-1 text-sm text-slate-500">سند نهایی بر اساس داده نمونه PR-1048.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <Eye className="size-4" aria-hidden />
                پیش نمایش
              </Button>
              <Button variant="secondary">
                <Printer className="size-4" aria-hidden />
                چاپ
              </Button>
            </div>
          </div>
          <div className="bg-slate-100 p-4 md:p-8">
            <article className="mx-auto min-h-[760px] max-w-[760px] rounded-2xl bg-white p-8 text-slate-950 shadow-2xl shadow-slate-300/60">
              <div className="flex items-start justify-between gap-6 border-b border-slate-200 pb-6">
                <div>
                  <Badge tone="blue">درخواست خرید</Badge>
                  <h3 className="mt-4 text-2xl font-black">خرید تجهیزات شبکه شعبه مرکزی</h3>
                  <p className="mt-2 text-sm text-slate-500">شماره سند: DOC-PR-1048</p>
                </div>
                <div className="rounded-2xl bg-[#071326] px-4 py-3 text-left text-white" dir="ltr">
                  <p className="text-xs text-blue-100/75">NavaBPM</p>
                  <p className="text-lg font-black">PDF</p>
                </div>
              </div>

              <section className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  ["درخواست کننده", "سارا رضایی"],
                  ["مرکز هزینه", "عملیات فناوری اطلاعات"],
                  ["فروشنده", "شرکت داده پردازان سپهر"],
                  ["مبلغ", "۶۸۰,۰۰۰,۰۰۰ ریال"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className="mt-2 text-sm font-black text-slate-950">{value}</p>
                  </div>
                ))}
              </section>

              <section className="mt-8">
                <h4 className="text-base font-black">شرح درخواست</h4>
                <p className="mt-3 text-sm leading-8 text-slate-700">
                  این خرید برای جایگزینی سوییچ های فرسوده و افزایش پایداری شبکه شعبه مرکزی ثبت شده است.
                  پیش فاکتور بررسی شده و مسیر تایید مالی به دلیل مبلغ بالاتر از سقف فعال شده است.
                </p>
              </section>

              <section className="mt-8">
                <h4 className="text-base font-black">مسیر تایید</h4>
                <div className="mt-4 grid gap-3">
                  {["ثبت درخواست توسط سارا رضایی", "تایید مدیر مستقیم", "تایید مالی توسط گروه مالی", "صدور سفارش خرید"].map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                      <span className="grid size-8 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-10 grid grid-cols-2 gap-5 border-t border-slate-200 pt-6">
                <div>
                  <p className="text-xs font-bold text-slate-500">امضای درخواست کننده</p>
                  <div className="mt-8 h-px bg-slate-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">امضای مدیر مالی</p>
                  <div className="mt-8 h-px bg-slate-300" />
                </div>
              </div>
            </article>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
