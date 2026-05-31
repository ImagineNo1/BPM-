import {
  BarChart3,
  Boxes,
  Braces,
  Building2,
  ClipboardList,
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  PenTool,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "داشبورد", icon: LayoutDashboard },
  { href: "/processes", label: "فرایندها", icon: GitBranch },
  { href: "/designer", label: "سیستم ساز", icon: Building2 },
  { href: "/forms", label: "فرم ساز", icon: ClipboardList },
  { href: "/api-generator", label: "API ساز", icon: Braces },
  { href: "/instances", label: "پیگیری نمونه ها", icon: Gauge },
  { href: "/documents", label: "خروجی سند", icon: FileText },
];

export const metrics = [
  { label: "فرایند فعال", value: "۲۴", change: "۴ فرایند در بازبینی", icon: GitBranch },
  { label: "نمونه در جریان", value: "۱٬۲۸۶", change: "۸۲ مورد با SLA نزدیک", icon: Boxes },
  { label: "فرم منتشر شده", value: "۴۱", change: "۶ فرم در پیش نویس", icon: PenTool },
  { label: "API تولید شده", value: "۱۸", change: "۹۸.۷٪ پاسخ موفق", icon: BarChart3 },
];

export const trendData = [
  { name: "شنبه", completed: 32, delayed: 7 },
  { name: "یکشنبه", completed: 45, delayed: 5 },
  { name: "دوشنبه", completed: 39, delayed: 11 },
  { name: "سه شنبه", completed: 58, delayed: 8 },
  { name: "چهارشنبه", completed: 63, delayed: 4 },
  { name: "پنجشنبه", completed: 51, delayed: 6 },
  { name: "جمعه", completed: 28, delayed: 3 },
];

export const processMix = [
  { name: "مالی", value: 38 },
  { name: "منابع انسانی", value: 24 },
  { name: "عملیات", value: 21 },
  { name: "حقوقی", value: 17 },
];

export const processes = [
  {
    name: "درخواست خرید سازمانی",
    owner: "واحد تدارکات",
    status: "منتشر شده",
    version: "v3.2",
    instances: "۳۸۴",
    sla: "۹۶٪",
    updated: "امروز، ۱۰:۴۵",
  },
  {
    name: "جذب و استخدام",
    owner: "منابع انسانی",
    status: "در بازبینی",
    version: "v2.8",
    instances: "۱۲۸",
    sla: "۸۹٪",
    updated: "دیروز، ۱۶:۲۰",
  },
  {
    name: "تایید قرارداد مشتری",
    owner: "حقوقی",
    status: "پیش نویس",
    version: "v1.4",
    instances: "۷۲",
    sla: "۹۲٪",
    updated: "۳ روز پیش",
  },
  {
    name: "رسیدگی به شکایت",
    owner: "تجربه مشتری",
    status: "منتشر شده",
    version: "v5.1",
    instances: "۵۹۱",
    sla: "۹۸٪",
    updated: "امروز، ۰۹:۱۰",
  },
];

export const instances = [
  {
    id: "PR-1048",
    title: "خرید تجهیزات شبکه",
    process: "درخواست خرید سازمانی",
    assignee: "سارا رضایی",
    step: "تایید مالی",
    status: "در جریان",
    due: "۲ ساعت",
  },
  {
    id: "HR-2291",
    title: "استخدام تحلیلگر داده",
    process: "جذب و استخدام",
    assignee: "امیر توکلی",
    step: "مصاحبه فنی",
    status: "نیازمند اقدام",
    due: "امروز",
  },
  {
    id: "LC-7710",
    title: "قرارداد پشتیبانی سالانه",
    process: "تایید قرارداد مشتری",
    assignee: "مینا کریمی",
    step: "بازبینی حقوقی",
    status: "متوقف",
    due: "۱ روز گذشته",
  },
  {
    id: "CS-6103",
    title: "درخواست خسارت مشتری",
    process: "رسیدگی به شکایت",
    assignee: "نوید احمدی",
    step: "پاسخ نهایی",
    status: "در جریان",
    due: "۵ ساعت",
  },
];

export const formFields = [
  "عنوان درخواست",
  "مرکز هزینه",
  "مبلغ پیشنهادی",
  "فروشنده منتخب",
  "پیوست پیش فاکتور",
  "توضیحات تکمیلی",
];

export const endpoints = [
  { method: "POST", path: "/api/processes/purchase-request/start", label: "شروع نمونه فرایند" },
  { method: "GET", path: "/api/instances/{id}/timeline", label: "دریافت خط زمانی" },
  { method: "PATCH", path: "/api/tasks/{id}/complete", label: "تکمیل وظیفه" },
  { method: "POST", path: "/api/documents/generate", label: "ساخت سند خروجی" },
];
