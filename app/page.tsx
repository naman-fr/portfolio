import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Publications from "../components/Publications";
import Contact from "../components/Contact";
import ScrollProgress from "../components/ScrollProgress";

export default function Home() {
  // #region agent log
  // Server component - logging will happen in client components
  // #endregion
  return (
    <Layout>
      <div className="crt-overlay" />
      <ScrollProgress />
      <div id="hero" className="section-snap">
        <Hero />
      </div>
      <div id="experience" className="section-snap">
        <Experience />
      </div>
      <div id="projects" className="section-snap">
        <Projects />
      </div>
      <div id="skills" className="section-snap">
        <Skills />
      </div>
      <div id="achievements" className="section-snap">
        <Achievements />
      </div>
      <div id="publications" className="section-snap">
        <Publications />
      </div>
      <div id="contact" className="section-snap">
        <Contact />
      </div>
    </Layout>
  );
}
