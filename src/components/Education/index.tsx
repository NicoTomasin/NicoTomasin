import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { VictoryLabel, VictoryPie } from "victory";
import Course from "../Course";
export default function Education({ tl }: { tl: GSAPTimeline }) {
  const projectsRef = useRef(null);
  const projectTitle = useRef();
  const data = [
    { x: "2 Materias", y: 2, label: "En Curso | 10%" },
    { x: "18 Materias", y: 18, label: "Aprobadas | 90%" },
  ];

  useGSAP(
    () => {
      tl.from(".title", {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "+=200 bottom",
          end: "top bottom",
          scrub: 3,
        },
        rotationY: 36,
        opacity: 0,
        duration: 0.5,
        yPercent: -100,
        stagger: 0.1,
        ease: "expo.inOut",
      })
        .from(".projectParagraph", {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          scale: "0.5",
          opacity: 0,
        })
        .from(".grafico", {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "+=500 bottom",
            end: "top bottom",
            scrub: 3,
          },
          rotationY: 36,
          opacity: 0,
          duration: 0.5,
          yPercent: -100,
          stagger: 0.1,
          ease: "expo.inOut",
        })
        .from(".course", {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "+=500 bottom",
            end: "top bottom",
            scrub: 3,
          },
          rotationY: 36,
          opacity: 0,
          duration: 0.5,
          yPercent: -100,
          stagger: 0.1,
          ease: "expo.inOut",
        });
    },
    { scope: projectsRef }
  );

  return (
    <div
      ref={projectsRef}
      className="overflow-hidden mx-auto px-4 lg:px-36 flex flex-col items-center text-white w-screen text-center mt-28"
    >
      <div className="text-center">
        <h2 className="projectTitle font-semibold text-cyan-400 sm:text-5xl sm:tracking-tight lg:text-6xl flex justify-center align-middle">
          <p className="title text-6xl">Educación</p>
        </h2>
        <p className="projectParagraph max-w-xl mt-5 mx-auto text-2xl text-white">
          Mi avance y aprendizaje continuo certificado por alguna entidad.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 sm:grid-cols-1 mt-24 h-auto p-4">
        <div className="grafico">
          <h2 className="projectTitle font-semibold text-cyan-400 sm:text-5xl sm:tracking-tight lg:text-6xl flex justify-center ">
            <p className="title text-2xl">Desarrollo Web | UNLaM</p>
          </h2>
          <VictoryPie
            height={350}
            width={500}
            data={data}
            colorScale={["#fef08a", "#34d399"]}
            labelComponent={<VictoryLabel />}
            style={{
              labels: {
                fill: "white",
                fontSize: 10,
                fontWeight: "bold",
              },
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: ({ style }) => {
                          return style.fill === "#22d3ee"
                            ? null
                            : { style: { fill: "#22d3ee" } };
                        },
                      },
                      {
                        target: "labels",
                        mutation: ({ text, datum }) => {
                          return text === datum.xName
                            ? null
                            : { text: datum.xName };
                        },
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: ({ style }) => {
                          return style.fill === "#22d3ee"
                            ? null
                            : { style: { fill: "#22d3ee" } };
                        },
                      },
                      {
                        target: "labels",
                        mutation: ({ text, datum }) => {
                          return text === datum.xName
                            ? null
                            : { text: datum.xName };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-cyan-400 sm:text-5xl sm:tracking-tight lg:text-6xl flex justify-center">
            <p className="course text-2xl">Cursos y certificaciones</p>
          </h2>
          <div className="course">
            <Course
              platform={"Platzi"}
              color={"bg-green-500"}
              link={"https://platzi.com/p/NicoTomasin/"}
            />
          </div>
          <div className="course">
            <Course
              platform={"FreeCodeCamp"}
              color={"bg-stone-500"}
              link={"https://www.freecodecamp.org/NicoTomasin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
