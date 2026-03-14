import { useEffect, useState } from "react";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

// Extracted outside the component to prevent unnecessary re-allocations on render
const COLORS = [
  "#161b22", // Level 0 (Empty)
  "#0e4429", // Level 1
  "#006d32", // Level 2
  "#26a641", // Level 3
  "#39d353", // Level 4
];

const GithubHeatmap = ({ username }: { username: string }) => {
  const [data, setData] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setData(json.contributions);
      } catch (err) {
        console.error("Error fetching contributions:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchContributions();
  }, [username]);

  if (error) {
    return (
      <div className="p-4 text-sm text-zinc-500 border rounded-xl border-zinc-800 bg-[#0d1117]">
        Failed to load GitHub contributions.
      </div>
    );
  }

  return (
    // The container handles overflow gracefully on mobile devices
    <div className="w-full p-4 border rounded-xl bg-[#0d1117] border-zinc-800 overflow-x-auto">
      {/* grid-rows-7 + grid-flow-col: Forces days to render top-to-bottom (Sun-Sat),
        then left-to-right. This perfectly matches GitHub's chronological flow.
        w-max ensures the grid never squishes on smaller screens.
      */}
      <div className="grid grid-rows-7 grid-flow-col gap-0.5 w-max mx-auto">
        {loading
          ? // Loading skeletons
            Array.from({ length: 364 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="w-2.5 h-2.5 rounded-0.5 bg-zinc-800/50 animate-pulse"
              />
            ))
          : // Actual contribution data
            data.map((day) => (
              <div
                key={day.date}
                className="w-2.5 h-2.5 rounded-full cursor-pointer hover:scale-125 hover:ring-1 hover:ring-zinc-400 hover:z-10 transition-all duration-200"
                style={{ backgroundColor: COLORS[day.level] }}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
      </div>
    </div>
  );
};

export default GithubHeatmap;