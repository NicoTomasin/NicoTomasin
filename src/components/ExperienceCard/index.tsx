import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
export default function ExperienceCard({
  title,
  description,
  href,
  stack,
}: {
  title: string;
  description: string;
  href: string;
  stack: { name: string; properties: string }[];
}) {
  useGSAP(() => {
    const neonTL = gsap.timeline({ repeat: -1, yoyo: true });
    neonTL
      .from(".neon-sign", {
        filter: "saturate(100%) brightness(1)",
        boxShadow:
          "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #09d, 0 0 15px #09d, 0 0 30px #09d",
      })
      .to(".neon-sign", {
        filter: "saturate(150%) brightness(1.5)",
        boxShadow:
          "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #09d, 0 0 15px #09d, 0 0 30px #09d",
      })
      .to(
        ".neon-sign",
        {
          filter: "saturate(200%) brightness(1.2)",
          boxShadow:
            "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #09d, 0 0 15px #09d, 0 0 30px #09d",
        },
        "+=0.2"
      )
      .to(
        ".neon-sign",
        {
          filter: "saturate(150%) brightness(1.5)",
          boxShadow:
            "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #09d, 0 0 15px #09d, 0 0 30px #09d",
        },
        "+=0.2"
      )
      .to(
        ".neon-sign",
        {
          filter: "saturate(100%) brightness(1)",
          boxShadow:
            "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #09d, 0 0 15px #09d, 0 0 30px #09d",
        },
        "+=0.2"
      );
  });
  return (
    <a
      className="text-cyan-400 hover:text-cyan-400"
      href={href}
      target="_blank"
    >
      <div className="neon-sign max-w-xl flex flex-col items-center p-4 border-2 rounded-xl border-cyan-400">
        <div className="text-3xl font-semibold mt-5 md:mt-0">
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
        <p className="mt-3 text-gray-400">{description}</p>
      </div>
    </a>
  );
}
