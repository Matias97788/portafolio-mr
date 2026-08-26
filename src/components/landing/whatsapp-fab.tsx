"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const waUrl = "https://wa.me/56979428207";

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

export function WhatsAppFab({
  className,
  text = "¿Cotizamos por WhatsApp?",
}: {
  className?: string;
  text?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const [value, setValue] = React.useState(reduceMotion ? text : "");

  React.useEffect(() => {
    if (reduceMotion) return;

    let i = 0;
    const tick = () => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        const restart = window.setTimeout(() => {
          i = 0;
          setValue("");
          timer = window.setInterval(tick, 32);
        }, 2500);
        timeouts.push(restart);
      }
    };

    let timer = window.setInterval(tick, 32);
    const timeouts: number[] = [];

    return () => {
      clearInterval(timer);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [reduceMotion, text]);

  return (
    <div className={cn("fixed bottom-4 right-4 z-40", className)}>
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 shadow-lg shadow-black/30 backdrop-blur transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
        aria-label="Abrir chat de WhatsApp"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366] ring-1 ring-[#25D366]/30">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="hidden max-w-[220px] text-sm text-foreground/90 sm:block">
          <span className="inline-flex items-center gap-1">
            <span>{value}</span>
            <span
              className={cn(
                "h-4 w-px bg-foreground/60",
                reduceMotion ? "hidden" : "animate-pulse",
              )}
              aria-hidden="true"
            />
          </span>
        </span>
      </a>
    </div>
  );
}
