// Project.tsx
import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export type ProjectProps = {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  github?: string;
  live?: string;
};

const tagClass = (tag?: string) => {
  if (!tag) return "bg-white/5 text-gray-200 border-white/6";
  const t = tag.toLowerCase();
  if (t.includes("react"))
    return "bg-sky-800/20 text-sky-300 border-sky-300/10";
  if (t.includes("typescript") || t.includes("ts"))
    return "bg-indigo-800/20 text-indigo-300 border-indigo-300/10";
  if (t.includes("tailwind"))
    return "bg-teal-800/20 text-teal-300 border-teal-300/10";
  if (t.includes("node") || t.includes("node.js"))
    return "bg-emerald-800/20 text-emerald-300 border-emerald-300/10";
  if (t.includes("python"))
    return "bg-amber-800/20 text-amber-300 border-amber-300/10";
  if (t.includes("cli") || t.includes("ink"))
    return "bg-violet-800/20 text-violet-300 border-violet-300/10";
  if (t.includes("api") || t.includes("rest"))
    return "bg-rose-800/20 text-rose-300 border-rose-300/10";
  if (t.includes("ai"))
    return "bg-fuchsia-800/20 text-fuchsia-300 border-fuchsia-300/10";
  if (t.includes("bun"))
    return "bg-orange-800/20 text-orange-300 border-orange-300/10";
  return "bg-white/5 text-gray-200 border-white/6";
};

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  tags = [],
  github,
  live,
}) => {
  return (
    <article className="group relative rounded-2xl overflow-hidden border border-white/6 bg-linear-to-tr from-white/2 to-white/4 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer">
      <div className="relative h-52 md:h-56 lg:h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-700 flex items-center justify-center text-gray-300">
            <span className="text-sm uppercase tracking-wider">No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-white/6 backdrop-blur hover:bg-white/10 transition flex items-center justify-center"
              aria-label="Open live demo"
            >
              <FiExternalLink className="fill-red-500 text-red-500" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-white/6 backdrop-blur hover:bg-white/10 transition flex items-center justify-center"
              aria-label="Open GitHub"
            >
              <FiGithub className="fill-teal-500 text-teal-500" />
            </a>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-md border ${tagClass(t)} select-none`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span className="opacity-90">
            Made by <strong className="text-gray-200">vathsavv56</strong>
          </span>
          <div className="flex items-center gap-3">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View code
              </a>
            ) : (
              <span className="italic text-gray-500">Code private</span>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Project;
