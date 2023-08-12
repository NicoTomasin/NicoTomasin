import Cryptonotify from "./Cryptonotify";
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
  ];
  return (
    <div className="mx-auto max-w-screen-lg px-3 py-6">
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
