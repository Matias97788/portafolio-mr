"use client";

import * as React from "react";
import {
  Atom,
  BarChart3,
  Boxes,
  Code2,
  Database,
  Globe,
  Mail,
  Notebook,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const tools = [
  { label: "React", Icon: Atom },
  { label: "React Native", Icon: Smartphone },
  { label: "WordPress", Icon: Globe },
  { label: "Shopify", Icon: ShoppingBag },
  { label: "WooCommerce", Icon: ShoppingCart },
  { label: "Zapier", Icon: Zap },
  { label: "Node.js", Icon: Boxes },
  { label: "PHP", Icon: Code2 },
  { label: "MongoDB", Icon: Database },
  { label: "Klaviyo", Icon: Mail },
  { label: "Notion", Icon: Notebook },
  { label: "GA4", Icon: BarChart3 },
];

function ToolChip({
  label,
  Icon,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 border border-border bg-card px-3.5 py-2 text-sm text-foreground">
      <Icon className="h-4 w-4 text-primary" />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

export function ToolsCarousel() {
  const content = React.useMemo(() => [...tools, ...tools], []);
  const [reduceMotion, setReduceMotion] = React.useState(true);

  React.useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <section id="herramientas" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <Reveal>
          <div>
            <h2 className="font-display text-3xl tracking-tight">
              Herramientas
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Stack práctico, probado y enfocado en entrega.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-8 overflow-hidden border border-border bg-card/70">
          <div className="relative py-6">
            <div
              className={cn(
                "flex w-max gap-3 px-6",
                reduceMotion ? "flex-wrap justify-center" : "animate-marquee",
              )}
            >
              {content.map((t, i) => (
                <ToolChip key={`${t.label}-${i}`} label={t.label} Icon={t.Icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
