"use client";

import * as React from "react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function AnimatedBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay}>
      {children}
    </Reveal>
  );
}

export function AnimatedList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const items = React.Children.toArray(children);

  return (
    <Stagger className={className}>
      {items.map((child, index) => (
        <StaggerItem key={index} className="h-full">
          {child}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Reveal className={cn(className)}>{children}</Reveal>;
}
