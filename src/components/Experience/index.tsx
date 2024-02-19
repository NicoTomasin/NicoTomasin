import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import ExperienceCard from "../ExperienceCard";

export default function Experience({ tl }: { tl: GSAPTimeline }) {
  const experienceRef = useRef(null);
  const cardsRef = useRef([]);
  const Experience = [
    {
      title: "Block Builders",
      description:
        "Block Builders es una consultora de software con una fuerte orientación en el desarrollo blockchain y web",
      href: "https://www.block-builders.tech/",
      stack: [
        {
          name: "Frontend",
          properties: "text-green-400",
        },
        {
          name: "Actualidad",
          properties: "text-yellow-500",
        },
      ],
    },
    {
      title: "Freelance",
      description:
        "He trabajado como freelance en varios proyectos como automatizaciones, landing pages y blogs",
      href: "https://www.nicotomasin.com.ar/",
      stack: [
        {
          name: "Fullstack",
          properties: "text-green-400",
        },
        {
          name: "Actualidad",
          properties: "text-yellow-500",
        },
      ],
    },
    {
      title: "CryptoNotify",
      description:
        "CryptoNotify es una plataforma de notificaciones de precios de criptomonedas en tiempo real",
      href: "https://www.cryptonotify.me/",
      stack: [
        {
          name: "Co-Founder",
          properties: "text-green-400",
        },
        {
          name: "jul. 2021 - sep. 2023",
          properties: "text-red-400",
        },
      ],
    },
  ];

  useGSAP(
    () => {
      tl.from(".experienceTitle", {
        scrollTrigger: {
          trigger: experienceRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        x: "-=100",
        opacity: 0,
      })
        .from(".experienceSubtitle", {
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          x: "+=100",
          opacity: 0,
        })
        .from(".experienceParagraph", {
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          x: "-=100",
          opacity: 0,
        });
      Experience.forEach((experience, index) => {
        const card = cardsRef.current[index];
        tl.from(card, {
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          },
          x: index % 2 === 0 ? -400 : 400,
          opacity: 0,
          duration: 1,
          delay: 0.2 * index,
          ease: "power3.out",
        });
      });
    },
    { scope: experienceRef }
  );

  return (
    <div
      ref={experienceRef}
      className="overflow-x-hidden mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-white w-screen p-8 text-center"
    >
      <div className="text-center">
        <h2 className="experienceTitle text-base font-semibold tracking-wide uppercase">
          Experiencia
        </h2>
        <p className="experienceSubtitle mt-1 text-4xl font-extrabold text-cyan-400 sm:text-5xl sm:tracking-tight lg:text-6xl">
          ¿Qué me hace diferente?
        </p>
        <p className="experienceParagraph max-w-xl mt-5 mx-auto text-xl text-white">
          Soy una persona que se adapta a los cambios, me gusta aprender cosas
          nuevas y siempre estoy en constante crecimiento.
        </p>
      </div>
      <div className="overflow-visible grid lg:grid-cols-2 gap-4 sm:grid-cols-1 mt-24 h-auto p-4">
        {Experience.map((experience, index) => (
          <Fragment key={experience.title}>
            <div
              ref={(el) => {
                if (cardsRef && el !== null) {
                  // @ts-ignore
                  cardsRef.current[index] = el!;
                }
              }}
              className={`card z-40 mb-4 ${index > 0 ? "mt-4" : ""}`}
            >
              <ExperienceCard {...experience} />
            </div>
            {index < Experience.length - 1 && (
              <>
                <div></div>
                <div></div>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
