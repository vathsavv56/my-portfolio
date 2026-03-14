import React from "react";
import Project from "./Project";
import type { ProjectProps } from "./Project";
import Kern from "../assets/kern-1.jpeg";
import Ging from "../assets/ging.png";
import Lexi from "../assets/resume-ats.jpeg";
import { BsArrowUpRight } from "react-icons/bs";

const projects: ProjectProps[] = [
  {
    title: "Kern",
    description:
      "A modern React component library focused on design system consistency and developer DX. Includes route-aware components and theme support.",
    image: Kern,
    tags: [
      "React",
      "TypeScript",
      "Tailwind",
      "Component Library",
      "React Router",
    ],
    github: "https://github.com/vathsavv56/kern",
    live: "https://kern-sigma.vercel.app",
  },
  {
    title: "Ging",
    description:
      "An npm package that renders GitHub profiles inside the terminal using Ink. Great for quick profile lookups and demos in CLI-first workflows.",
    image: Ging,
    tags: ["bun", "Ink", "React", "CLI"],
    github: "https://github.com/vathsavv56/ging",
    live: "https://www.npmjs.com/package/@vathsavv56/ging",
  },
  {
    title: "Chaos API",
    description:
      "A playful REST API with many routes that return unpredictable and fun data. Built to practice API design, rate-limiting, and deploy pipelines.",
    image: Kern,
    tags: ["bun", "REST API", "Express", "MongoDB"],
    github: "https://github.com/vathsavv56/chaos",
    live: "https://kern-sigma.vercel.app",
  },
  {
    title: "LexiScore",
    description:
      "An ATS resume scanner that analyzes resumes to provide an ATS-compatibility score and actionable suggestions for improving match rates.",
    image: Lexi,
    tags: ["React", "TypeScript", "AI", "Resume Analysis"],
    github: "https://github.com/vathsavv56/lexiscore",
    live: "https://resume-ats-gamma.vercel.app/",
  },
];

const ProjectSection: React.FC = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <span className="block h-px w-10 bg-white/20"></span>
              Projects
            </h2>
            <p className="text-gray-400 mt-2 max-w-lg">
              Selected works — experiments, libraries, and small apps I've built
              while learning and shipping.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 p-4">
            <a
              href="https://github.com/vathsavv56"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-2 rounded-lg border border-white/8 bg-white/3 hover:bg-white/5 transition-all flex items-center justify-center gap-2 "
            >
              GitHub <BsArrowUpRight />
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <Project key={idx} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
