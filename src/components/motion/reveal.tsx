"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function useInView(margin = "-80px") {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, visible };
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className={cn(visible ? "stagger-visible" : "stagger-hidden", className)}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("stagger-item", className)}>{children}</div>;
}
