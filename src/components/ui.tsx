import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-blue-600 text-white shadow-[0_12px_24px_rgba(36,87,255,0.22)] hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_30px_rgba(36,87,255,0.28)] active:translate-y-0 active:scale-[0.99]",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/80 hover:text-blue-700",
        variant === "ghost" && "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
        variant === "dark" &&
          "bg-slate-950 text-white shadow-[0_12px_28px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 hover:bg-slate-800",
        className,
      )}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonProps["variant"];
};

export function LinkButton({ className, variant = "primary", ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        variant === "primary" &&
          "bg-blue-600 text-white shadow-[0_12px_24px_rgba(36,87,255,0.22)] hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_30px_rgba(36,87,255,0.28)] active:translate-y-0 active:scale-[0.99]",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/80 hover:text-blue-700",
        variant === "ghost" && "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
        variant === "dark" &&
          "bg-slate-950 text-white shadow-[0_12px_28px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 hover:bg-slate-800",
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "premium-card min-w-0 rounded-2xl border bg-white panel-shadow",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Badge({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: "blue" | "purple" | "green" | "amber" | "red" | "slate";
  className?: string;
}) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    red: "border-rose-200 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-extrabold shadow-sm",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-extrabold text-slate-600">{label}</span>
      <input
        value={value}
        readOnly
        className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      />
      {helper ? <span className="text-xs leading-5 text-slate-500">{helper}</span> : null}
    </label>
  );
}
