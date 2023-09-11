import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import LatestPost from "@/components/LatestPost";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-5">
      <Hero />
      <Projects />
      <LatestPost />
      <Education />
      {/*<Newsletter />*/}
    </main>
  );
}
