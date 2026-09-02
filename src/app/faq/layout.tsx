import { SiteShell } from "@/components/landing/site-shell";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
