import type { ReactNode } from "react";

interface BodyProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Body({ title, subtitle, children }: BodyProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}
