"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Command,
  Menu,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui";

const pageTitles: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "مرکز کنترل فرایندها",
    desc: "نمای اجرایی برای پایش سلامت فرایندها، کارهای معطل و خروجی های عملیاتی.",
  },
  "/processes": {
    title: "کتابخانه فرایندها",
    desc: "چرخه عمر فرایندها، نسخه ها، مالکیت و وضعیت انتشار را در یک نما مدیریت کنید.",
  },
  "/designer": {
    title: "سیستم ساز کسب و کار",
    desc: "طراحی فرایندهایی که فرم، داده، API، موبایل، وظیفه، سند و داشبورد تولید می کنند.",
  },
  "/forms": {
    title: "فرم ساز سازمانی",
    desc: "فرم های RTL، اعتبارسنجی، بخش بندی و اتصال به مراحل فرایند.",
  },
  "/api-generator": {
    title: "تولید کننده API",
    desc: "ساخت خودکار Endpoint، Payload، Webhook و کلیدهای یکپارچه سازی.",
  },
  "/instances": {
    title: "رهگیری نمونه های فرایند",
    desc: "پیگیری SLA، مالک فعلی، گام بعدی و ریسک تاخیر در سطح نمونه.",
  },
  "/documents": {
    title: "پیش نمایش خروجی سند",
    desc: "طراحی، کنترل و مشاهده خروجی PDF بر اساس داده های فرایند و فرم.",
  },
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = pageTitles[pathname] ?? pageTitles["/"];

  return (
    <div className="min-h-dvh text-slate-950 lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-[300px] translate-x-full border-l border-white/10 bg-[#061225] text-white shadow-2xl shadow-slate-950/30 transition-transform duration-200 lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 lg:shadow-none",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-[linear-gradient(180deg,#071326_0%,#081a34_54%,#061225_100%)] px-4 py-5">
          <div className="flex items-center justify-between gap-3 px-2 pb-1">
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-[0_18px_34px_rgba(36,87,255,0.32)] ring-1 ring-white/15">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-lg font-black">نوافرایند</span>
                <span className="block text-xs text-blue-100/70">BPM Studio</span>
              </span>
            </Link>
            <button
              className="grid size-11 place-items-center rounded-2xl text-blue-100 hover:bg-white/10 lg:hidden"
              aria-label="بستن منو"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-100/70">فضای کاری</p>
                <p className="mt-1 text-sm font-black">گروه توسعه کسب و کار</p>
              </div>
              <ChevronDown className="size-4 text-blue-100/70" />
            </div>
          </div>

          <nav className="mt-6 grid gap-1.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group relative flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-extrabold text-slate-300 transition duration-200",
                    "hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300",
                    active &&
                      "bg-white text-slate-950 shadow-[0_16px_34px_rgba(0,0,0,0.24)] hover:bg-white hover:text-slate-950",
                  )}
                >
                  {active ? (
                    <span className="absolute inset-y-2 right-0 w-1 rounded-l-full bg-blue-600" />
                  ) : null}
                  <Icon
                    className={cn(
                      "size-5 text-slate-400 transition group-hover:text-white",
                      active && "text-blue-600",
                    )}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-blue-300/20 bg-gradient-to-br from-blue-500/18 to-purple-500/12 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.2)]">
            <p className="text-sm font-black">نمونه اولیه قابل کلیک</p>
            <p className="mt-2 text-xs font-medium leading-6 text-blue-50/76">
              داده ها آزمایشی هستند و برای نمایش تجربه کاربری محصول استفاده شده اند.
            </p>
            <LinkButton href="/designer" className="mt-4 w-full" variant="secondary">
              <Plus className="size-4" aria-hidden />
              ساخت فرایند
            </LinkButton>
          </div>
        </div>
      </aside>

      {open ? (
        <button
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
          aria-label="بستن منوی کناری"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-[#f4f7fb]/86 px-4 py-5 shadow-[0_1px_0_rgba(255,255,255,0.72)_inset] backdrop-blur-xl md:px-6 xl:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3">
              <button
                className="grid size-11 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 lg:hidden"
                aria-label="باز کردن منو"
                onClick={() => setOpen(true)}
              >
                <Menu className="size-5" />
              </button>
              <div>
                <h1 className="text-[1.7rem] font-black leading-tight tracking-normal text-slate-950 md:text-[2rem]">
                  {current.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-600">{current.desc}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block min-w-0 sm:w-[320px]">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="جستجو در فرایند، فرم یا نمونه"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white/95 pr-10 pl-3 text-sm font-semibold shadow-sm outline-none transition placeholder:font-medium placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <div className="flex gap-2">
                <Button variant="secondary" className="size-11 px-0" aria-label="فرمان ها">
                  <Command className="size-4" />
                </Button>
                <Button variant="secondary" className="size-11 px-0" aria-label="اعلان ها">
                  <Bell className="size-4" />
                </Button>
                <LinkButton href="/designer">
                  <Plus className="size-4" aria-hidden />
                  فرایند جدید
                </LinkButton>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-7 md:px-6 xl:px-8">{children}</div>
      </main>
    </div>
  );
}
