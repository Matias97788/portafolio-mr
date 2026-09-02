"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function PageEnter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className={cn(ready ? "page-enter" : "page-enter-pending", className)}
    >
      {children}
    </div>
  );
}
