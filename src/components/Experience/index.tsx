"use client";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ExperienceCard from "../ExperienceCard";

gsap.registerPlugin(ScrollTrigger);
export default function Experience() {
  const experienceRef = useRef(null);
  const tl = gsap.timeline();
  const Experience = [
    {
      title: "Block Builders",
      description:
        "Block Builders es una consultora de software con una fuerte orientación en el desarrollo blockchain y web",
      href: "https://www.block-builders.tech/",
      stack: [
        {
          name: "Frontend Developer",
          properties: "bg-blue-600 text-emerald-50",
        },
        {
          name: "Actualidad",
          properties: "bg-green-400 text-emerald-900",
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
          name: "Fullstack Developer",
          properties: "bg-blue-600 text-emerald-50",
        },
        {
          name: "Actualidad",
          properties: "bg-green-400 text-emerald-900",
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
          properties: "bg-blue-600 text-emerald-50",
        },
        {
          name: "jul. 2021 - sep. 2023",
          properties: "bg-rose-400 text-rose-900",
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
          end: "bottom center",
          scrub: true,
        },
        x: "-=100",
        opacity: 0,
      })
        .from(".experienceSubtitle", {
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          },
          x: "+=100",
          opacity: 0,
        })
        .from(".experienceParagraph", {
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          },
          x: "-=100",
          opacity: 0,
        });
    },
    { scope: experienceRef, dependencies: [ScrollTrigger] }
  );

  return (
    <div
      ref={experienceRef}
      className="overflow-hidden max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-white w-screen h-screen p-8 text-center"
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
          nuevas y siempre estoy en constante crecimiento. Me gusta trabajar en
          equipo y compartir conocimientos.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1 mt-24">
        {Experience.map((experience, index) => (
          <Fragment key={experience.title}>
            <div className={`mb-4 ${index > 0 ? "mt-4" : ""}`}>
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
