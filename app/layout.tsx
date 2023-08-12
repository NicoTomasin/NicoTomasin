import "./globals.css";
import "atropos/atropos.css";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>NicoTomasin | Portfolio</title>
      <meta
        name="description"
        content="Bienvenid@ a mi portfolio personal, espero que te guste! 🚀"
      />

      <meta property="og:url" content="https://nicotomasin.com.ar/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NicoTomasin | Portfolio" />
      <meta
        property="og:description"
        content="Bienvenid@ a mi portfolio personal, espero que te guste! 🚀"
      />
      <meta property="og:image" content="/ogImage.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="nicotomasin.com.ar" />
      <meta property="twitter:url" content="https://nicotomasin.com.ar/" />
      <meta name="twitter:title" content="NicoTomasin | Portfolio" />
      <meta
        name="twitter:description"
        content="Bienvenid@ a mi portfolio personal, espero que te guste! 🚀"
      />
      <meta name="twitter:image" content="/ogImage.png" />
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
