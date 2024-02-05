"use client";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "../ProjectsCard";
gsap.registerPlugin(ScrollTrigger);
export default function Projects() {
  const projectsRef = useRef(null);
  const projectTitle = useRef();
  const tl = gsap.timeline();
  const tl2 = gsap.timeline();
  const Projects = [
    {
      title: "Block Builders Landing Page",
      description:
        "Cree la landing page de Block Builders, una empresa de desarrollo de software y blockchain, Ademas integre Mercado Pago para la gestión de pagos.",
      href: "https://www.block-builders.tech/",
      image: "/projects/blockBuilders.png",
      stack: [
        {
          name: "Astro",
          properties: "bg-red-400 text-red-900",
        },
        {
          name: "Mercado Pago",
          properties: "bg-yellow-300 text-yellow-800",
        },
        {
          name: "Tailwind",
          properties: "bg-blue-400 text-blue-900",
        },
      ],
    },
    {
      title: "Cynthia Castro Blog",
      description:
        "Ademas de la creación de la lading page, hice la integración con Sanity CMS para la gestión de los posts y multiples idiomas aprovechando la funcionalidad de i18n de NextJs",
      href: "https://dra.cynthiacastro.com/es",
      image: "/projects/Cynthia.png",
      stack: [
        {
          name: "NextJs",
          properties: "bg-gray-300 text-black",
        },
        {
          name: "Sanity",
          properties: "bg-neutral-800 text-neutral-300",
        },
        {
          name: "Tailwind",
          properties: "bg-blue-400 text-blue-900",
        },
      ],
    },
    {
      title: "CryptoNotify",
      description:
        "CryptoNotify es el proyecto mas grande en el que trabaje, Cree la mayoría del frontend ademas de participar en el despliegue usando AWS e integrando pagos con Stripe",
      href: "https://www.cryptonotify.me/",
      image: "/projects/Cryptonotify.png",
      stack: [
        {
          name: "NextJs",
          properties: "bg-gray-300 text-black",
        },
        {
          name: "Stripe",
          properties: "bg-purple-300 text-purple-800",
        },
        {
          name: "Material-UI",
          properties: "bg-blue-400 text-blue-900",
        },
        {
          name: "AWS",
          properties: "bg-orange-300 text-orange-800",
        },
      ],
    },
    {
      title: "All Project",
      description:
        "Es un proyecto de Block Builders el cual quedo en espera pero me dio la posibilidad de trabajar con .Net y PostgreSQL en el backend y con ReactJs y redux RTK en el frontend.",
      href: "https://www.all-project.tech/",
      image: "/projects/AllProject.png",
      stack: [
        {
          name: ".Net",
          properties: "bg-purple-600 text-white",
        },
        {
          name: "React",
          properties: "bg-blue-400 text-blue-900",
        },
        {
          name: "Redux RTK",
          properties: "bg-purple-400 text-purple-800",
        },
      ],
    },
  ];
  useGSAP(
    () => {
      tl.from(".letter", {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom",
          end: "=+300 bottom",
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
      tl2.from(".cards", {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom",
          end: "=+500 bottom",
          scrub: 5,
        },
        rotationY: 36,
        opacity: 0,
        duration: 1,
        yPercent: -100,
        stagger: 0.1,
        ease: "expo.inOut",
      });
    },
    { scope: projectsRef, dependencies: [ScrollTrigger] }
  );

  return (
    <div
      ref={projectsRef}
      className="overflow-x-hidden mx-auto px-4 lg:px-36 flex flex-col items-center text-white w-screen  text-center mt-28 "
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
          Estos son algunos proyectos en los que participe.
        </p>
      </div>
      <div className="grid xl:grid-cols-4 gap-8 sm:grid-cols-1 lg:grid-cols-2 mt-24 h-auto p-4">
        {Projects.map((projects, index) => (
          <div className="cards" key={index}>
            <ProjectCard {...projects} />
          </div>
        ))}
      </div>
    </div>
  );
}
