import { useEffect, useState } from "react";

type AnalyticsStats = {
  visitors: number;
  pageviews: number;
  visits: number;
  bounces: number;
  activeVisitors: number;
  periodLabel: string;
};

type MetricKey = "visitors" | "pageviews" | "visits" | "activeVisitors";

const metrics: { key: MetricKey; label: string }[] = [
  { key: "visitors", label: "Visitors" },
  { key: "pageviews", label: "Pageviews" },
  { key: "visits", label: "Visits" },
  { key: "activeVisitors", label: "Active now" },
];

const numberFormatter = new Intl.NumberFormat("en-US");

const PageAnalytics = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchAnalytics = async () => {
      try {
        setError(null);

        const response = await fetch("/api/analytics", {
          headers: {
            Accept: "application/json",
          },
        });

        const payload = (await response.json()) as AnalyticsStats & {
          message?: string;
        };

        if (!response.ok) {
          throw new Error(payload.message || "Failed to fetch analytics.");
        }

        if (isActive) {
          setStats(payload);
        }
      } catch (fetchError) {
        console.error("Failed to fetch analytics", fetchError);

        if (isActive) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Analytics data is unavailable right now.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchAnalytics();

    const intervalId = window.setInterval(fetchAnalytics, 60000);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const bounceRate =
    stats && stats.visits > 0
      ? `${Math.round((stats.bounces / stats.visits) * 100)}%`
      : "0%";

  return (
    <div className="p-10 font-manrope text-white">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">Analytics</h1>
          <p className="mt-2 text-sm text-zinc-400">
            {stats?.periodLabel || "Loading your latest Umami numbers"}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              <div className="mt-4 h-8 w-24 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {stats ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-zinc-100">
                  {numberFormatter.format(stats[item.key])}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Bounce rate
              </p>
              <p className="mt-3 text-3xl font-semibold text-zinc-100">
                {bounceRate}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Data source
              </p>
              <p className="mt-3 text-lg text-zinc-100">
                Secure Umami API proxy
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PageAnalytics;
