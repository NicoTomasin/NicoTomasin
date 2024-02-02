import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Image from "next/image";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="fixed top-0 right-5 p-4">
          <div className="mb-4">
            <a
              href="/blog"
              rel="noopener noreferrer"
              className="text-2xl text-white"
            >
              Blog
            </a>
          </div>
        </div>
        {children}
        <Analytics />
        <div className="fixed bottom-0 left-0 p-4">
          <div className="mb-4">
            <Image
              src="/icons/github.svg"
              alt="Nico Tomasin github"
              width={25}
              height={25}
              className="hover:scale-105 transition animate-fade-up animate-duration-600 animate-ease-out"
            />
          </div>
          <div className="mb-4">
            <Image
              src="/icons/instagram.svg"
              alt="Nico Tomasin instagram"
              width={25}
              height={25}
              className="hover:scale-105 transition animate-fade-up animate-duration-600 animate-ease-out"
            />
          </div>
          <div>
            <Image
              src="/icons/x.svg"
              alt="Nico Tomasin twitter"
              width={25}
              height={25}
              className="hover:scale-105 transition animate-fade-up animate-duration-600 animate-ease-out"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: {
    template: "%s | NicoTomasin",
    default: "Portfolio | NicoTomasin",
  },
  metadataBase: new URL("https://www.nicotomasin.com.ar"),
  alternates: {
    canonical: "https://www.nicotomasin.com.ar",
    languages: {
      "es-ES": "es-ES",
    },
  },
  openGraph: {
    title: "Portfolio | NicoTomasin",
    description: "Bienvenid@ a mi portfolio personal, espero que te guste! 🚀",
    url: "https://www.nicotomasin.com.ar",
    siteName: "NicoTomasin",
    images: "https://www.nicotomasin.com.ar/ogImage.png",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "black",
  manifest: "https://www.nicotomasin.com.ar/manifest.json",
  category: "technology",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | NicoTomasin",
    description: "Bienvenid@ a mi portfolio personal, espero que te guste! 🚀",
    creator: "@NicolasTomasin",
    images: ["https://www.nicotomasin.com.ar/ogImage.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      nicoTomasin: [
        "hola@nicotomasin.com.ar",
        "https://www.nicotomasin.com.ar",
      ],
    },
  },
};
