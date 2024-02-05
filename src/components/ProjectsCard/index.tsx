import Image from "next/image";
export default function ProjectCard({
  title,
  description,
  href,
  stack,
  image,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  stack: { name: string; properties: string }[];
}) {
  return (
    <a
      className="text-cyan-400 hover:text-cyan-400 min-h-96"
      href={href}
      target="_blank"
    >
      <div className="projectCard w-96 flex flex-col items-center p-4 border-2 rounded-xl border-cyan-400">
        <div className="mb-4">
          <Image
            src={image}
            alt={description}
            title={title}
            className="rounded-xl border-cyan-400 border-2"
            width={1320}
            height={700}
          />
        </div>
        <div className="text-2xl font-semibold mt-5 md:mt-0">
          <h3>{title}</h3>
        </div>
        <div className="flex justify-center items-center mt-3">
          <div className="flex flex-col items-center gap-y-2 md:flex-row">
            <div className="flex gap-2">
              {stack.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-md px-2 py-1 text-sm font-semibold ${item.properties} focus:pointer-events-auto`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-gray-400 text-lg text-justify	">{description}</p>
      </div>
    </a>
  );
}
