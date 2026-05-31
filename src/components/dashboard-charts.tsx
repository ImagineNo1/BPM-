"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { processMix, trendData } from "@/lib/mock-data";

const colors = ["#2457ff", "#6941c6", "#0ea5b7", "#12b76a"];

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}

function ChartSkeleton({ className = "h-[290px]" }: { className?: string }) {
  return (
    <div className={`${className} rounded-2xl border border-slate-100 bg-slate-50/80`}>
      <div className="flex h-full items-end gap-3 p-5">
        {[42, 68, 54, 78, 62, 88, 50].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-2xl bg-slate-200/70"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ThroughputChart() {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartSkeleton />;
  }

  return (
    <div className="h-[310px]" aria-label="نمودار تکمیل فرایندها">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ top: 18, right: 10, left: 4, bottom: 4 }}>
          <defs>
            <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2457ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2457ff" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="delayed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e7edf6" vertical={false} strokeDasharray="4 8" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#667085", fontSize: 12, fontWeight: 700 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#667085", fontSize: 12, fontWeight: 700 }}
            width={34}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e4e7ec",
              borderRadius: 16,
              boxShadow: "0 18px 44px rgba(15,23,42,.14)",
              direction: "rtl",
              textAlign: "right",
              fontWeight: 700,
            }}
          />
          <Area
            type="monotone"
            dataKey="completed"
            name="تکمیل شده"
            stroke="#2457ff"
            strokeWidth={3.5}
            fill="url(#completed)"
            dot={{ r: 3, strokeWidth: 2, fill: "#fff", stroke: "#2457ff" }}
            activeDot={{ r: 6, strokeWidth: 3, fill: "#fff", stroke: "#2457ff" }}
          />
          <Area
            type="monotone"
            dataKey="delayed"
            name="تاخیر"
            stroke="#f97316"
            strokeWidth={2.5}
            fill="url(#delayed)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MixChart() {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartSkeleton className="h-[180px]" />;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
      <div className="relative h-[190px]">
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="persian-number text-2xl font-black text-slate-950">۲۴</p>
            <p className="text-xs font-bold text-slate-500">فعال</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processMix}
              innerRadius={58}
              outerRadius={84}
              paddingAngle={5}
              dataKey="value"
              stroke="#fff"
              strokeWidth={4}
            >
              {processMix.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                border: "1px solid #e4e7ec",
                borderRadius: 16,
                direction: "rtl",
                textAlign: "right",
                fontWeight: 700,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3">
        {processMix.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-50">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <span className="size-2.5 rounded-full shadow-sm" style={{ background: colors[index] }} />
              {item.name}
            </span>
            <span className="persian-number text-sm font-black text-slate-950">{item.value}٪</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ApiBarChart() {
  const mounted = useMounted();
  const data = [
    { name: "شروع", value: 42 },
    { name: "وظیفه", value: 68 },
    { name: "سند", value: 28 },
    { name: "Webhook", value: 51 },
  ];

  if (!mounted) {
    return <ChartSkeleton className="h-[190px]" />;
  }

  return (
    <div className="h-[210px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 0, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="#e7edf6" vertical={false} strokeDasharray="4 8" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#667085", fontSize: 12, fontWeight: 700 }} dy={8} />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              border: "1px solid #e4e7ec",
              borderRadius: 16,
              direction: "rtl",
              textAlign: "right",
              fontWeight: 700,
            }}
          />
          <Bar dataKey="value" radius={[14, 14, 6, 6]} fill="#2457ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
