export default function ProjectCard({
  children,
  title,
  description,
  href,
  stack,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  href: string;
  stack: { name: string; properties: string }[];
}) {
  return (
    <div
      className="flex flex-col items-center gap-x-8 rounded-md p-3 md:flex-row bg-gradient-to-b md:bg-gradient-to-r from-blue-850 to-blue-950"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="shrink-0">
        <a href={href} target="_blank">
          {children}
        </a>
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          <a className="hover:text-cyan-400" href={href} target="_blank">
            <div className="text-xl font-semibold mt-5 md:mt-0">{title}</div>
          </a>
          <div className="ml-3 flex gap-2">
            {stack.map((item) => (
              <div
                key={item.name}
                className={`rounded-md px-2 py-1 text-xs font-semibold ${item.properties}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-gray-400">{description}</p>
      </div>
    </div>
  );
}