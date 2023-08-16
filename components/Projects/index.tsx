import Cryptonotify from "./Cryptonotify";
import InformateConEve from "./InformateConEve";
import ProjectCard from "./ProjectCard";
export default function Projects() {
  const projects = [
    {
      title: "CryptoNotify",
      description:
        "CryptoNotify es el proyecto más grande en el que colabore. Es un servicio de alertas de criptomonedas que te permite recibir notificaciones en tiempo real sobre eventos que pueden afectar el precio de las criptomonedas.",
      href: "https://www.cryptonotify.me/",
      stack: [
        {
          name: "React",
          properties: "bg-cyan-400 text-cyan-900",
        },
        {
          name: "JavaScript",
          properties: "bg-amber-400 text-amber-900",
        },
        {
          name: "Next.js",
          properties: "bg-stone-400 text-stone-900",
        },
        {
          name: "Material UI",
          properties: "bg-blue-400 text-blue-900",
        },
      ],
      children: <Cryptonotify />,
    },
    {
      title: "Infórmate con Eve",
      description:
        "Infórmate con Eve es un blog de uso personal. Fue desarrollado tratando de seguir las buenas prácticas de SEO ademas de ser un blog rápido y accesible. También es una PWA, por lo que se puede instalar en cualquier dispositivo.",
      href: "https://www.informateconeve.com.ar/",
      stack: [
        {
          name: "Astro",
          properties: "bg-orange-400 text-orange-900",
        },
        {
          name: "Typescript",
          properties: "bg-blue-400 text-blue-900",
        },
        {
          name: "TailwindCSS",
          properties: "bg-cyan-400 text-cyan-900",
        },
        {
          name: "TinaCMS",
          properties: "bg-rose-400 text-rose-900",
        },
      ],
      children: <InformateConEve />,
    },
  ];
  return (
    <div
      id="projects"
      className="mx-auto max-w-screen-lg px-3 py-6 animate-fade-up animate-duration-600    animate-ease-out"
    >
      <div className="mb-6 text-2xl font-bold">
        Proyectos{" "}
        <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Recientes
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
