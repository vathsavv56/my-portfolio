import { useEffect, useState } from "react";

import { DEFAULT_LOADER, isLoaderKey } from "../loaderMap";
import type { LoaderKey } from "../loaderMap";

const STORAGE_KEY = "assigned-loader";
const COOKIE_KEY = "assigned-loader";
const DEV_FALLBACK_LOADER: LoaderKey = "hindi";

const getCookieValue = (name: string): string | null => {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const useLoader = () => {
  const [loaderKey, setLoaderKey] = useState<LoaderKey | null>(null);

  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const fallbackLoader = isDev ? DEV_FALLBACK_LOADER : DEFAULT_LOADER;

    const cookieValue = getCookieValue(COOKIE_KEY);
    if (isDev) {
      if (cookieValue && isLoaderKey(cookieValue)) {
        localStorage.setItem(STORAGE_KEY, cookieValue);
        setTimeout(() => setLoaderKey(cookieValue), 0);
        return;
      }

      localStorage.setItem(STORAGE_KEY, fallbackLoader);
      setTimeout(() => setLoaderKey(fallbackLoader), 0);
      return;
    }

    const locked = localStorage.getItem(STORAGE_KEY);
    if (locked && isLoaderKey(locked)) {
      setTimeout(() => setLoaderKey(locked), 0);
      return;
    }

    if (cookieValue && isLoaderKey(cookieValue)) {
      localStorage.setItem(STORAGE_KEY, cookieValue);
      setTimeout(() => setLoaderKey(cookieValue), 0);
      return;
    }

    localStorage.setItem(STORAGE_KEY, fallbackLoader);
    setTimeout(() => setLoaderKey(fallbackLoader), 0);
  }, []);

  return loaderKey;
};
