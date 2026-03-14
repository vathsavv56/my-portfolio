const UMAMI_CLOUD_API_URL = "https://api.umami.is/v1";
const DEFAULT_RANGE_DAYS = 30;

type AnalyticsBody = {
  visitors?: number;
  pageviews?: number;
  visits?: number;
  bounces?: number;
  activeVisitors?: number;
  periodLabel?: string;
  message?: string;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: AnalyticsBody) => void;
};

function sendJson(response: ResponseLike, statusCode: number, body: AnalyticsBody) {
  response.status(statusCode).json(body);
}

function getDateRange(days: number) {
  const endAt = Date.now();
  const startAt = endAt - days * 24 * 60 * 60 * 1000;

  return { startAt, endAt };
}

async function fetchUmami(endpoint: string, apiKey: string) {
  const response = await fetch(`${UMAMI_CLOUD_API_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
      "x-umami-api-key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Umami request failed with ${response.status}`);
  }

  return response.json() as Promise<{
    visitors?: number;
    pageviews?: number;
    visits?: number;
    bounces?: number;
  }>;
}

export default async function handler(
  _request: unknown,
  response: ResponseLike,
) {
  const apiKey = process.env.UMAMI_API_KEY;
  const websiteId = process.env.VITE_UMAMI_WEBSITE_ID;
  const rangeDays = Number(
    process.env.UMAMI_STATS_RANGE_DAYS || DEFAULT_RANGE_DAYS,
  );

  if (!apiKey || !websiteId) {
    return sendJson(response, 500, {
      message: "Missing Umami API configuration.",
    });
  }

  try {
    const { startAt, endAt } = getDateRange(rangeDays);
    const query = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
    });

    const [stats, active] = await Promise.all([
      fetchUmami(`/websites/${websiteId}/stats?${query.toString()}`, apiKey),
      fetchUmami(`/websites/${websiteId}/active`, apiKey),
    ]);

    return sendJson(response, 200, {
      visitors: Number(stats.visitors) || 0,
      pageviews: Number(stats.pageviews) || 0,
      visits: Number(stats.visits) || 0,
      bounces: Number(stats.bounces) || 0,
      activeVisitors: Number(active.visitors) || 0,
      periodLabel: `Last ${rangeDays} days`,
    });
  } catch (error) {
    console.error("Umami analytics proxy failed", error);

    return sendJson(response, 502, {
      message: "Failed to fetch analytics from Umami.",
    });
  }
}