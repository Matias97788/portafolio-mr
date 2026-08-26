"use client";

import * as React from "react";

export function DeferredAnalytics() {
  const [Analytics, setAnalytics] =
    React.useState<React.ComponentType | null>(null);
  const [VercelAnalytics, setVercelAnalytics] =
    React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    const load = () => {
      void import("@/components/analytics").then((mod) => {
        setAnalytics(() => mod.Analytics);
      });
      void import("@vercel/analytics/react").then((mod) => {
        setVercelAnalytics(() => mod.Analytics);
      });
    };

    const idleCallback = window.requestIdleCallback;
    if (idleCallback) {
      const id = idleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = globalThis.setTimeout(load, 2000);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return (
    <>
      {Analytics ? <Analytics /> : null}
      {VercelAnalytics ? <VercelAnalytics /> : null}
    </>
  );
}
