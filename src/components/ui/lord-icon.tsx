"use client";

import * as React from "react";

type LordIconProps = {
  src: string;
  className?: string;
  size?: number;
  trigger?: "hover" | "loop" | "loop-on-hover" | "morph";
  colors?: string;
};

export function LordIcon({
  src,
  className,
  size = 42,
  trigger = "loop-on-hover",
  colors = "primary:#4f9cf7,secondary:#a8b3cf",
}: LordIconProps) {
  return React.createElement("lord-icon", {
    src,
    trigger,
    colors,
    style: { width: `${size}px`, height: `${size}px` },
    className,
  });
}

