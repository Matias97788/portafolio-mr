import { Contact } from "@/components/landing/contact";
import { AnimatedBlock } from "@/components/motion/animated";
import { getSiteConfig } from "@/lib/server/store";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Contacto",
  description:
    "Cotiza desarrollo web, ecommerce, apps o automatización. Formulario de contacto de Matías Rodríguez en Santiago, Chile.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Matías Rodríguez",
    url: `${SITE_URL}/contacto`,
  },
};

export default async function ContactoPage() {
  const config = await getSiteConfig();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <AnimatedBlock>
        <Contact services={config.services} titleAs="h1" />
      </AnimatedBlock>
    </main>
  );
}
