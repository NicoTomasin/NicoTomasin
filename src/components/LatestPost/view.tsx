"use client";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PostCard from "../PostCard";
gsap.registerPlugin(ScrollTrigger);

export default function View({ posts }: { posts: any[] }) {
  const latestPostRef = useRef(null);
  const projectTitle = useRef();
  const tl = gsap.timeline();
  const today = new Date();
  useGSAP(
    () => {
      tl.from(".title", {
        scrollTrigger: {
          trigger: latestPostRef.current,
          start: "top bottom",
          end: "=+500 bottom",
          scrub: 5,
        },
        y: -100,
        opacity: 0,
        ease: "expo.inOut",
      })
        .from(".cards", {
          scrollTrigger: {
            trigger: latestPostRef.current,
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
        })
        .from(".verTodos", {
          scrollTrigger: {
            trigger: latestPostRef.current,
            start: "top bottom",
            end: "=+500 bottom",
            scrub: 5,
          },
          y: -100,
          opacity: 0,
          ease: "expo.inOut",
        });
    },
    { scope: latestPostRef, dependencies: [ScrollTrigger] }
  );
  const recentPosts = posts
    .filter((post) => {
      const postDate = new Date(post.date.split("/").reverse().join("-"));
      return postDate <= today; // Filtrar solo los posts con fecha menor o igual a hoy
    })
    .sort((a, b) => {
      const dateA: any = new Date(a.date.split("/").reverse().join("-"));
      const dateB: any = new Date(b.date.split("/").reverse().join("-"));
      return dateB - dateA; // Ordenar de más nuevo a más antiguo
    })
    .slice(0, 3)
    .map((post, index) => (
      <div className="cards" key={index}>
        <PostCard key={post.slug} post={post} />
      </div>
    ));
  return (
    <div
      ref={latestPostRef}
      className="latestPost mx-auto max-w-screen-lg px-3 py-6 animate-fade-up animate-duration-600 animate-ease-out mt-28 md:mb-0 mb-36"
    >
      <div className="mb-6 text-2xl font-bold">
        <div className="titles flex items-baseline justify-between">
          <div>
            Últimos{" "}
            <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Posts
            </span>
          </div>
          <div className="verTodos text-sm hover:text-cyan-400 transition">
            <a href="/blog">Ver todos los posts →</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{recentPosts}</div>
    </div>
  );
}
