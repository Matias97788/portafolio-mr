import { SiteShell } from "@/components/landing/site-shell";

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
