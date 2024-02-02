"use client";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
export default function Hero() {
  const heroRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.from(h1Ref.current, {
        opacity: 0,
        duration: 0.5,
        y: -100,
      })
        .from(h2Ref.current, {
          opacity: 0,
          duration: 0.5,
          y: -100,
        })
        .to(h1Ref.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
          top: 10,
          left: 10,
          fontSize: 20,
        })
        .to(h2Ref.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
          fontSize: 0,
        });
    },
    { scope: heroRef, dependencies: [ScrollTrigger] }
  );

  return (
    <div
      ref={heroRef}
      className="flex flex-col items-center justify-center text-white w-screen h-screen p-8 text-center"
    >
      <h1 ref={h1Ref} className="title fixed text-5xl p-4 z-10">
        NICO TOMASIN
      </h1>
      <h2 ref={h2Ref} className=" subtitlebox text-3xl mt-32 text-cyan-400">
        DESARROLLADOR WEB
      </h2>
    </div>
  );
}
