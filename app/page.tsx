import Layout from "../components/Layout";
import HeroV2 from "../components/HeroV2";
import ProjectGridV2 from "../components/ProjectGridV2";
import Experience from "../components/Experience";
import SkillsOrbit from "../components/SkillsOrbit";
import Achievements from "../components/Achievements";
import TestimonialsV2 from "../components/TestimonialsV2";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <Layout>
      <div id="hero" className="section-snap">
        <HeroV2 />
      </div>
      
      <div id="projects" className="section-snap">
        <ProjectGridV2 />
      </div>

      <div id="experience" className="section-snap">
        <Experience />
      </div>

      <div id="skills" className="section-snap">
        <SkillsOrbit />
      </div>

      <div id="achievements" className="section-snap">
        <Achievements />
      </div>

      <div id="testimonials" className="section-snap">
        <TestimonialsV2 />
      </div>

      <div id="contact" className="section-snap">
        <Contact />
      </div>
    </Layout>
  );
}
