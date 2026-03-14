import { FaDocker, FaReact } from "react-icons/fa";
import { SiNextdotjs , SiFigma } from "react-icons/si";
import { MdAutoGraph } from "react-icons/md";

const learning = [
  { name: "Docker", icon: FaDocker },
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "UI Design", icon: SiFigma },
  { name: "Constantly Learning", icon: MdAutoGraph },
];

const CurrentlyLearning = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-white/20"></span>
          Currently Exploring
        </h2>
        <div className="flex flex-wrap gap-3">
          {learning.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <Icon className="text-sm opacity-80" />
                <span className="text-sm text-gray-300">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;
