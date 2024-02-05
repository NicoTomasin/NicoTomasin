"use client";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 p-4 w-screen h-16 bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 z-50">
      {pathname === "/blog" ? (
        <a
          href="/"
          rel="noopener noreferrer"
          className="text-2xl text-white left-8 fixed"
        >
          Nico Tomasin
        </a>
      ) : (
        ""
      )}
      <a
        href="/blog"
        rel="noopener noreferrer"
        className="text-2xl text-white right-8 fixed"
      >
        Blog
      </a>
    </div>
  );
}
