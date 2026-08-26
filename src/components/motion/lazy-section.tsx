"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function LazySection({
  children,
  className,
  minHeight = 280,
}: {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}
