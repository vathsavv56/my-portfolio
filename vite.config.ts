import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Plugin } from "vite";

const UMAMI_CLOUD_API_URL = "https://api.umami.is/v1";
const DEFAULT_RANGE_DAYS = 30;

type UmamiStatsResponse = {
  visitors?: number;
  pageviews?: number;
  visits?: number;
  bounces?: number;
};

type UmamiActiveResponse = {
  visitors?: number;
};

function getDateRange(days: number) {
  const endAt = Date.now();
  const startAt = endAt - days * 24 * 60 * 60 * 1000;

  return { startAt, endAt };
}

async function fetchUmami<T>(endpoint: string, apiKey: string): Promise<T> {
  const response = await fetch(`${UMAMI_CLOUD_API_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
      "x-umami-api-key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Umami request failed with ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}

async function getAnalyticsPayload(env: Record<string, string>) {
  const apiKey = env.UMAMI_API_KEY;
  const websiteId = env.VITE_UMAMI_WEBSITE_ID;
  const rangeDays = Number(env.UMAMI_STATS_RANGE_DAYS || DEFAULT_RANGE_DAYS);

  if (!apiKey || !websiteId) {
    return {
      statusCode: 500,
      body: { message: "Missing Umami API configuration." },
    };
  }

  const { startAt, endAt } = getDateRange(rangeDays);
  const query = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
  });

  try {
    const [stats, active] = await Promise.all([
      fetchUmami<UmamiStatsResponse>(
        `/websites/${websiteId}/stats?${query.toString()}`,
        apiKey,
      ),
      fetchUmami<UmamiActiveResponse>(`/websites/${websiteId}/active`, apiKey),
    ]);

    return {
      statusCode: 200,
      body: {
        visitors: Number(stats.visitors) || 0,
        pageviews: Number(stats.pageviews) || 0,
        visits: Number(stats.visits) || 0,
        bounces: Number(stats.bounces) || 0,
        activeVisitors: Number(active.visitors) || 0,
        periodLabel: `Last ${rangeDays} days`,
      },
    };
  } catch (error) {
    console.error("Umami analytics dev proxy failed", error);

    return {
      statusCode: 502,
      body: { message: "Failed to fetch analytics from Umami." },
    };
  }
}

function sendJson(response: ServerResponse, statusCode: number, body: unknown) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

function analyticsMiddleware(env: Record<string, string>) {
  return async (
    request: IncomingMessage,
    response: ServerResponse,
    next: () => void,
  ) => {
    const url = request.url ? new URL(request.url, "http://localhost") : null;

    if (!url || url.pathname !== "/api/analytics") {
      return next();
    }

    const { statusCode, body } = await getAnalyticsPayload(env);
    return sendJson(response, statusCode, body);
  };
}

function umamiAnalyticsApi(env: Record<string, string>): Plugin {
  return {
    name: "umami-analytics-api",
    configureServer(server) {
      server.middlewares.use(analyticsMiddleware(env));
    },
    configurePreviewServer(server) {
      server.middlewares.use(analyticsMiddleware(env));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
      umamiAnalyticsApi(env),
    ],
  };
});
