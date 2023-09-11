import EducationCard from "@/components/Education/EducationCard";
export default function Education() {
  const Education = [
    {
      title: "Tecticatura en Desarrollo Web",
      description:
        "Cuento con el 65% de la carrera aprobada y soy alumno regular, la inicie en 2019 y espero finalizarla en 2024.",
      href: "https://www.unlam.edu.ar/index.php?seccion=3&idArticulo=399",
      stack: [
        {
          name: "UNLaM",
          properties: "bg-green-600 text-emerald-50",
        },
        {
          name: "Pre-Grado",
          properties: "bg-pink-400 text-pink-900",
        },
        {
          name: "En curso",
          properties: "bg-orange-400 text-orange-900",
        },
      ],
    },
    {
      title: "Responsive Web Design",
      description:
        "Certificación de FreeCodeCamp focalizada en el desarrollo de sitios web responsivos con HTML, CSS y Flexbox. 2023",
      href: "https://www.freecodecamp.org/certification/NicoTomasin/responsive-web-design",
      stack: [
        {
          name: "FreeCodeCamp",
          properties: "bg-stone-400 text-stone-900",
        },
        {
          name: "Certificado",
          properties: "bg-amber-400 text-amber-900",
        },
        {
          name: "Terminado",
          properties: "bg-rose-400 text-rose-900",
        },
      ],
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      description:
        "Certificación de FreeCodeCamp donde se aprenden algoritmos en JavaScript y estructuras de datos como variables, matrices, objetos, bucles y funciones. 2023",
      href: "https://www.freecodecamp.org/certification/NicoTomasin/javascript-algorithms-and-data-structures",
      stack: [
        {
          name: "FreeCodeCamp",
          properties: "bg-stone-400 text-stone-900",
        },
        {
          name: "Certificado",
          properties: "bg-amber-400 text-amber-900",
        },
        {
          name: "Terminado",
          properties: "bg-rose-400 text-rose-900",
        },
      ],
    },
    {
      title: "Taller de Robótica, Automatización y Control Industrial",
      description:
        "Taller presencial de robótica, automatización y control industrial en el Polo de Innovación Tecnológica dictado por el partido de Ituzaingo. 2018.",
      href: "https://laciudadweb.com.ar/taller-gratuito-de-robotica-en-el-polo-de-innovacion-tecnologica-de-ituzaingo/",
      stack: [
        {
          name: "Ituzaingo",
          properties: "bg-green-600 text-emerald-50",
        },
        {
          name: "Curso",
          properties: "bg-cyan-400 text-cyan-900",
        },
        {
          name: "Terminado",
          properties: "bg-rose-400 text-rose-900",
        },
      ],
    },
  ];
  return (
    <div
      id="educacion"
      className="mx-auto max-w-screen-lg px-3 py-6 animate-fade-up animate-duration-600    animate-ease-out"
    >
      <div className="mb-6 text-2xl font-bold ">Educación</div>
      <div className="flex flex-col gap-6">
        {Education.map((Education) => (
          <EducationCard key={Education.title} {...Education} />
        ))}
      </div>
    </div>
  );
}
