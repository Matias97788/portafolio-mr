import { Footer } from "@/components/landing/footer";
import { NavBar } from "@/components/landing/nav-bar";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
