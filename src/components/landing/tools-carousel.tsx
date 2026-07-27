"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Atom,
  BarChart3,
  Boxes,
  Code2,
  Database,
  Globe,
  Mail,
  Wrench,
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
    <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-foreground/90 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <Icon className="h-4 w-4 text-primary" />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

export function ToolsCarousel() {
  const reduceMotion = useReducedMotion();
  const content = React.useMemo(() => [...tools, ...tools], []);
  const toolsImage = "/visuals/tools.svg";

  return (
    <section id="herramientas" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Herramientas
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Stack práctico, probado y enfocado en entrega.
              </p>
            </div>
            <div className="relative hidden h-20 w-32 overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card sm:block">
              <Image
                alt=""
                aria-hidden="true"
                src={toolsImage}
                fill
                sizes="128px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/20 to-transparent">
                <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-border bg-background/50 p-1.5 text-foreground/90 backdrop-blur">
                  <Wrench className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-8 overflow-hidden rounded-[calc(var(--radius-lg)+8px)] border border-border bg-card/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(500px 180px at 30% 0%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(420px 200px at 80% 100%, rgba(59,130,246,0.10), transparent 65%)",
            }}
          />

          <div className="relative py-6">
            <motion.div
              className={cn(
                "flex w-max gap-3 px-6",
                reduceMotion ? "flex-wrap justify-center" : "",
              )}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["0%", "-50%"],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 24, repeat: Infinity, ease: "linear" }
              }
            >
              {content.map((t, i) => (
                <ToolChip key={`${t.label}-${i}`} label={t.label} Icon={t.Icon} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
