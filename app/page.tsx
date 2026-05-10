import Layout from "../components/Layout";
import HeroV2 from "../components/HeroV2";
import ProjectGridV2 from "../components/ProjectGridV2";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <Layout>
      <div id="hero">
        <HeroV2 />
      </div>
      
      <div id="projects">
        <ProjectGridV2 />
      </div>

      {/* Skills Section Placeholder */}
      <section id="skills" className="py-32 bg-[#0a0a0a] flex items-center justify-center">
        <h2 className="text-huge font-bold text-white/5 opacity-20 uppercase tracking-tighter">SKILLS_ORBIT</h2>
      </section>

      <div id="contact">
        <Contact />
      </div>
    </Layout>
  );
}
