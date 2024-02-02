"use client";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ExperienceCard from "../ExperienceCard";

gsap.registerPlugin(ScrollTrigger);
export default function Experience() {
  const experienceRef = useRef(null);
  const tl = gsap.timeline();
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
          Educación
        </h2>
        <p className="experienceSubtitle mt-1 text-4xl font-extrabold text-blue-400 sm:text-5xl sm:tracking-tight lg:text-6xl">
          ¿En que me capacite?
        </p>
        <p className="experienceParagraph max-w-xl mt-5 mx-auto text-xl text-gray-300">
          Principalmente en el desarrollo de software, pero también cuento con
          conocimientos en el área de las automatización industriales y la
          domotica.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1 mt-24"></div>
    </div>
  );
}
