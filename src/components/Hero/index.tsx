import { useRef } from "react";
import { useGSAP } from "@gsap/react";
export default function Hero({
  tl,
  ScrollTrigger,
}: {
  tl: GSAPTimeline;
  ScrollTrigger: any;
}) {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const h2Ref = useRef(null);

  useGSAP(
    () => {
      tl.from(nameRef.current, {
        opacity: 0,
        duration: 0.5,
        y: -100,
      })
        .from(h2Ref.current, {
          opacity: 0,
          duration: 0.5,
          y: -100,
        })
        .to(nameRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
          top: 4,
          left: 8,
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
      className="flex flex-col items-center justify-center  w-screen h-screen p-8 text-center"
    >
      <h1 ref={nameRef} className="fixed text-4xl p-2 z-50">
        NICO TOMASIN
      </h1>

      <h2 ref={h2Ref} className="text-2xl mt-32 text-cyan-400">
        DESARROLLADOR WEB
      </h2>
    </div>
  );
}
