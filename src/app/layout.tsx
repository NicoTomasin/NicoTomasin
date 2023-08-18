import "./globals.css";
import "atropos/atropos.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
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
