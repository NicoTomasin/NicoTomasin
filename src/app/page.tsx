import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import LatestPost from "@/components/LatestPost";
import Newsletter from "@/components/Newsletter";
import Sw from "@/components/Sw";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-5">
      <Sw />
      <Hero />
      <Projects />
      <LatestPost />
      {/*<Newsletter />*/}
    </main>
  );
}
