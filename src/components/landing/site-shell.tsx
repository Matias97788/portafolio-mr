import { Footer } from "@/components/landing/footer";
import { NavBar } from "@/components/landing/nav-bar";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { PageEnter } from "@/components/motion/page-enter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <PageEnter className="flex-1">{children}</PageEnter>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
