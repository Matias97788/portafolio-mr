import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

import { Analytics } from "@/components/analytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Ingeniería que escala negocios`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "desarrollo web Chile",
    "Next.js",
    "Shopify",
    "WordPress",
    "automatización",
    "consultoría digital",
    "ingeniero informática",
    "Matías Rodríguez",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/visuals/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/visuals/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/visuals/favicon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/visuals/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    title: `${SITE_NAME} | Ingeniería que escala negocios`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Ingeniería que escala negocios`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0,0"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <VercelAnalytics />
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
