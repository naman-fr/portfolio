import Layout from "../components/Layout";
import HeroV2 from "../components/HeroV2";
import ProjectGridV2 from "../components/ProjectGridV2";
import SkillsOrbit from "../components/SkillsOrbit";
import TestimonialsV2 from "../components/TestimonialsV2";
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

      <div id="skills">
        <SkillsOrbit />
      </div>

      <div id="testimonials">
        <TestimonialsV2 />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </Layout>
  );
}
