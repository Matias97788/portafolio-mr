import { SiteShell } from "@/components/landing/site-shell";

export default function PortafolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
