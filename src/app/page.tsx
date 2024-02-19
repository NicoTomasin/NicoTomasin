"use client";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import gsap from "gsap";
import Education from "@/components/Education";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const tl = gsap.timeline();
  return (
    <>
      <Hero tl={tl} ScrollTrigger={ScrollTrigger} />
      <Experience tl={tl} />
      <Projects tl={tl} />
      <Education tl={tl} />
    </>
  );
}
