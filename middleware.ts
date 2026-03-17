import { next } from "@vercel/functions";

import { isLoaderKey, mapCountryToLoader } from "./src/loaderMap";

const COOKIE_NAME = "assigned-loader";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const parseCookie = (cookieHeader: string | null): string | null => {
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;

  const value = match.slice(`${COOKIE_NAME}=`.length);

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export default function middleware(request: Request) {
  const existingLoader = parseCookie(request.headers.get("cookie"));

  if (existingLoader && isLoaderKey(existingLoader)) {
    return next();
  }

  const loaderKey = mapCountryToLoader(
    request.headers.get("x-vercel-ip-country"),
  );

  return next({
    headers: {
      "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(loaderKey)}; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/; Secure; SameSite=Lax`,
    },
  });
}

export const config = {
  matcher: ["/((?!assets/|favicon.ico|.*\\..*).*)"],
};
