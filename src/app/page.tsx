import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import CaseStudies from "@/components/CaseStudies";
import WebWorks from "@/components/WebWorks";
import Contact from "@/components/Contact";
import BackgroundScene from "@/components/BackgroundSceneClient";

export default function Home() {
  return (
    <>
      <BackgroundScene />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <CaseStudies />
        <WebWorks />
        <Contact />
      </main>
    </>
  );
}
