import ContactSection from "./ContactSection"
import Profilesection from "./Profilesection"
import ProjectSection from "./ProjectSection"
import RandomSection from "./RandomSection"
import SkillsSection from "./SkillsSection"



const Home = () => {
  return (
    <div className="h-full w-full">
        <Profilesection/>
        <ContactSection/>
        <SkillsSection/>
        <ProjectSection/>
        <RandomSection/>
    </div>
  )
}

export default Home