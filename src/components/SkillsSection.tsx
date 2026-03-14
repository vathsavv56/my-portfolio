import { Icon } from "@iconify/react"

type Skill = {
  name: string
  icon?: string
  img?: string
  color?: string
}

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

  // Using your provided Zustand SVG
  {
    name: "Zustand",
    img: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg"
  },

  { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
  { name: "HTML", icon: "logos:html-5" },
  { name: "CSS", icon: "logos:css-3" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Bun", icon: "logos:bun" },
  { name: "Linux", icon: "logos:linux-tux" },

  { name: "Maven", icon: "simple-icons:apachemaven", color: "#ffffff" },
  { name: "React Router", icon: "logos:react-router" },
  { name: "Framer Motion", icon: "simple-icons:framer", color: "#ffffff" }
]

export default function SkillsSection() {
  return (
    <section className="w-full py-20 font-grosek">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-zinc-100">
          Stack
        </h2>

        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3">

          {skills.map((skill, i) => (
            <div
              key={i}
              title={skill.name}
              className="
                group
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
              {skill.img ? (
                <img
                  src={skill.img}
                  alt={skill.name}
                  className="h-5 w-5 object-contain"
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
  )
}