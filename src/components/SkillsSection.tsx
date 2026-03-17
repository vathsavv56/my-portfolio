import { Icon } from "@iconify/react";

type Skill = {
  name: string;
  icon?: string;
  img?: string;
  color?: string;
};

const skills: Skill[] = [
  { name: "Java", icon: "logos:java" },
  { name: "Python", icon: "logos:python" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "Express", icon: "simple-icons:express", color: "#ffffff" },
  { name: "MongoDB", icon: "logos:mongodb-icon" },
  {
    name: "Zustand",
    img: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
  },
  { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
  { name: "HTML", icon: "logos:html-5" },
  { name: "CSS", icon: "logos:css-3" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Bun", icon: "logos:bun" },
  { name: "Linux", icon: "logos:linux-tux" },
  {
    name: "shadcn/ui",
    img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/shadcnui.svg",
    color: "#ffffff",
  },
  { name: "React Router", icon: "logos:react-router" },
  { name: "Framer Motion", icon: "simple-icons:framer", color: "#ffffff" },
];

export default function SkillsSection() {
  return (
    <section className="w-full py-20 font-grosek">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3 mb-3">
          <span className="block h-px w-10 bg-white/20"></span>
          Stack
        </h2>

        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="
                group
                relative
                flex items-center justify-center
                h-11 w-11
                rounded-full
                border border-zinc-800
                bg-zinc-900/30
                backdrop-blur-sm
                transition
                hover:scale-105
                hover:border-gray-600
                hover:cursor-pointer
              "
            >
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] text-zinc-100 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {skill.name}
              </span>

              {skill.img ? (
                <img
                  src={skill.img}
                  alt={skill.name}
                  className="h-5 w-5 object-contain"
                  style={skill.color ? { filter: "brightness(0) invert(1)" } : undefined}
                />
              ) : (
                <Icon
                  icon={skill.icon!}
                  width="20"
                  color={skill.color}
                  className="text-zinc-200 opacity-90 group-hover:opacity-100 transition"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}