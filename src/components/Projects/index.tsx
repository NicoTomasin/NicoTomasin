"use client";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
export default function Projects() {
  const projectsRef = useRef(null);
  const projectTitle = useRef();
  const tl = gsap.timeline();
  useGSAP(
    () => {
      tl.from(".letter", {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "center bottom",
          end: "center bottom",
          scrub: 5,
        },
        rotationY: 36,
        opacity: 0,
        duration: 0.5,
        yPercent: -100,
        stagger: 0.1,
        ease: "expo.inOut",
      }).from(".projectParagraph", {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        scale: "0.5",
        opacity: 0,
      });
    },
    { scope: projectsRef, dependencies: [ScrollTrigger] }
  );

  return (
    <div
      ref={projectsRef}
      className="overflow-x-hidden max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-white w-screen h-screen p-8 text-center"
    >
      <div className="text-center">
        <h2 className="projectTitle font-extrabold text-cyan-400 sm:text-5xl sm:tracking-tight lg:text-6xl flex justify-center align-middle">
          <p className="letter text-6xl">P</p>
          <p className="letter text-6xl">r</p>
          <p className="letter text-6xl ">o</p>
          <p className="letter text-6xl ">y</p>
          <p className="letter text-6xl ">e</p>
          <p className="letter text-6xl ">c</p>
          <p className="letter text-6xl ">t</p>
          <p className="letter text-6xl ">o</p>
          <p className="letter text-6xl ">s</p>
        </h2>
        <p className="projectParagraph max-w-xl mt-5 mx-auto text-2xl text-white">
          Estos son los diferentes proyectos que participe ya sea durante un
          trabajo o como freelance.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1 mt-24"></div>
    </div>
  );
}
