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
            <a
              href="https://github.com/NicoTomasin"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-github hover:scale-105 transition animate-fade-up animate-duration-600 animate-ease-out hover:text-cyan-400 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
            </a>
          </div>
          <div className="mb-4">
            <a
              href="https://www.linkedin.com/in/nicolas-tomasin-838201153/"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-brand-linkedin transition animate-fade-up animate-duration-600 animate-ease-out hover:text-cyan-400 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M8 11l0 5" />
                <path d="M8 8l0 .01" />
                <path d="M12 16l0 -5" />
                <path d="M16 16v-3a2 2 0 0 0 -4 0" />
              </svg>
            </a>
          </div>
          <div>
            <a
              href="https://twitter.com/NicolasTomasin"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-x hover:scale-105 transition animate-fade-up animate-duration-600 animate-ease-out hover:text-cyan-400 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
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
