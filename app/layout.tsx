import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NicoTomasin",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-screen-lg px-3 py-6">
          <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              className="text-cyan-400 hover:underline"
              href="https://www.nicotomasin.com.ar/"
              rel="canonical"
            >
              <div className="flex items-center bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                {"<> "} Nico Tomasin {" </> "}
              </div>
            </a>
            <nav>
              <ul className="flex gap-x-3 font-medium text-gray-200">
                <li className="hover:text-white">
                  <a href="https://github.com/NicoTomasin" target="_blank">
                    GitHub
                  </a>
                </li>
                <li className="hover:text-white">
                  <a href="https://x.com/NicolasTomasin" target="_blank">
                    Twitter
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
