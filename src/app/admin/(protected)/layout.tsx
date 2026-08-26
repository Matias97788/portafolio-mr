import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/admin/logout-button";
import { Button } from "@/components/ui/button";
import { isValidAdminToken } from "@/lib/server/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("mr_admin")?.value;
  if (!isValidAdminToken(token)) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-lg)] border border-border bg-card text-sm font-semibold">
              MR
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-xs text-muted-foreground">
                Bandeja y configuración
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">Bandeja</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/blog">Blog</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/config">Configuración</Link>
            </Button>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
