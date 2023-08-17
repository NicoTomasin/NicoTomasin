import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="mx-auto max-w-screen-lg px-3">
      <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-x-24">
        <div>
          <h1 className="text-3xl font-bold animate-fade-up animate-duration-600 animate-ease-out">
            ¡Hola! Soy{" "}
            <span className="text-blue-650 bg-clip-text text-transparent">
              Nico
            </span>{" "}
            👋
          </h1>
          <p className="mt-6 text-xl leading-9 animate-fade-up animate-duration-600 animate-ease-out">
            Desarrollador web fullstack cofundador de{" "}
            <a
              className="text-green-500 hover:underline"
              href="/demo/astro-boilerplate"
            >
              CryptoNotify.me
            </a>{" "}
            especializado en tecnologías como{" "}
            <a
              className="text-cyan-400 hover:underline"
              href="/demo/astro-boilerplate"
            >
              React
            </a>{" "}
            y{" "}
            <a
              className="text-green-500 hover:underline"
              href="/demo/astro-boilerplate"
            >
              Node
            </a>
            . Bienvenid@ a mi portfolio personal, espero que te guste! 🚀
          </p>
          <div className="mt-3 flex gap-4">
            <a
              className="h-12 w-12 animate-fade-up animate-duration-600    animate-ease-out"
              href="https://www.linkedin.com/in/nicotomasin/"
              target="blank"
            >
              <button>
                <FaLinkedinIn />
              </button>
            </a>
            <a
              className="h-12 w-12 animate-fade-up animate-duration-600    animate-ease-out"
              href="https://www.github.com/NicoTomasin"
              target="blank"
            >
              <button className="bg-slate-500">
                <FaGithub />
              </button>
            </a>
            <a
              className="h-12 w-12 animate-fade-up animate-duration-600    animate-ease-out"
              href="https://twitter.com/NicolasTomasin"
              target="blank"
            >
              <button className="bg-cyan-400">
                <FaTwitter />
              </button>
            </a>
          </div>
        </div>
        <div className="shrink-0">
          <Image
            src="/avatar.svg"
            alt="Nico Tomasin"
            width={400}
            height={400}
            className="hover:scale-105 transition animate-fade-up animate-duration-600    animate-ease-out"
          />
        </div>
      </div>
    </div>
  );
}
