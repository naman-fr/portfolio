import Layout from "../components/Layout";
import HeroV2 from "../components/HeroV2";
import ProjectGridV2 from "../components/ProjectGridV2";
import Experience from "../components/Experience";
import SkillsOrbit from "../components/SkillsOrbit";
import Achievements from "../components/Achievements";
import Certifications from "../components/Certifications";
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

      <div id="certifications" className="section-snap">
        <Certifications />
      </div>

      <div id="contact" className="section-snap">
        <Contact />
      </div>
    </Layout>
  );
}
