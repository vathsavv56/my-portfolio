import ContactSection from "./ContactSection";
import GithubHeatmap from "./GithubHeatmap";
import Profilesection from "./Profilesection";
import ProjectSection from "./ProjectSection";
import RandomSection from "./RandomSection";
import SkillsSection from "./SkillsSection";
import AboutMe from "./AboutMe";
const Home = () => {
  return (
    <div className="h-full w-full">
      <Profilesection />
      <AboutMe />
      <ContactSection />
      <SkillsSection />
      <ProjectSection />
      <div className="px-6">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 font-manrope">
          <span className="h-px w-10 bg-white/20"></span>
          Github Heatmap
        </h2>
        <GithubHeatmap username="vathsavv56" />
      </div>
      <RandomSection />
    </div>
  );
};

export default Home;
