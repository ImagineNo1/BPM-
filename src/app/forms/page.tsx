import { CalendarDays, Check, GripVertical, ListChecks, Plus, Settings2, Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Field } from "@/components/ui";
import { formFields } from "@/lib/mock-data";

export default function FormsPage() {
  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_330px]">
        <Card className="p-4">
          <h2 className="text-lg font-black text-slate-950">فیلدهای فرم</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">بلوک ها را به فرم درخواست خرید اضافه کنید.</p>
          <div className="mt-5 grid gap-2">
            {[
              ["متن کوتاه", ListChecks],
              ["عدد و مبلغ", Plus],
              ["انتخابگر تاریخ", CalendarDays],
              ["بارگذاری فایل", Upload],
              ["چک لیست", Check],
            ].map(([label, Icon]) => {
              const Component = Icon as typeof ListChecks;
              return (
                <button
                  key={label as string}
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <Component className="size-4 text-blue-600" aria-hidden />
                  {label as string}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-l from-white to-blue-50/70 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">فرم درخواست خرید</h2>
                <p className="mt-1 text-sm text-slate-500">بخش اطلاعات پایه و پیوست ها</p>
              </div>
              <Badge tone="green">آماده انتشار</Badge>
            </div>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <Field label="عنوان درخواست" value="خرید تجهیزات شبکه شعبه مرکزی" />
            <Field label="مرکز هزینه" value="عملیات فناوری اطلاعات" />
            <Field label="مبلغ پیشنهادی" value="۶۸۰,۰۰۰,۰۰۰ ریال" helper="مبالغ بالاتر از سقف به تایید مالی ارسال می شوند." />
            <Field label="فروشنده منتخب" value="شرکت داده پردازان سپهر" />
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-semibold text-slate-600">توضیحات تکمیلی</span>
              <textarea
                readOnly
                value="این خرید برای جایگزینی سوییچ های فرسوده و افزایش پایداری شبکه شعبه مرکزی ثبت شده است."
                className="min-h-28 resize-none rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-7 text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <div className="md:col-span-2 rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-5 text-center">
              <Upload className="mx-auto size-8 text-blue-600" aria-hidden />
              <p className="mt-3 text-sm font-black text-slate-950">پیوست پیش فاکتور</p>
              <p className="mt-1 text-xs text-slate-500">PDF یا تصویر تا حجم ۱۰ مگابایت</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-slate-100 text-slate-700">
              <Settings2 className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-black text-slate-950">ساختار فرم</h2>
              <p className="mt-1 text-xs text-slate-500">ترتیب و وضعیت فیلدها</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            {formFields.map((field, index) => (
              <div
                key={field}
                className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="size-4 text-slate-400" aria-hidden />
                  <span className="text-sm font-bold text-slate-800">{field}</span>
                </div>
                <span className="text-xs font-black text-slate-400">{index + 1}</span>
              </div>
            ))}
          </div>
          <Button className="mt-5 w-full">
            <Plus className="size-4" aria-hidden />
            افزودن بخش جدید
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
