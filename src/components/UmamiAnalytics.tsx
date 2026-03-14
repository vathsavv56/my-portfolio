import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    umami?: {
      track: (
        payload?:
          | string
          | Record<string, unknown>
          | ((props: Record<string, unknown>) => Record<string, unknown>),
      ) => void;
    };
  }
}

const SCRIPT_ID = "umami-tracker-script";

const UmamiAnalytics = () => {
  const location = useLocation();
  const isScriptReadyRef = useRef(Boolean(window.umami?.track));

  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim();
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();
  const domains = import.meta.env.VITE_UMAMI_DOMAINS?.trim();
  const hostUrl = import.meta.env.VITE_UMAMI_HOST_URL?.trim();

  useEffect(() => {
    if (!scriptUrl || !websiteId) {
      return;
    }

    const handleLoad = () => {
      isScriptReadyRef.current = true;
      const url = `${location.pathname}${location.search}${location.hash}`;

      if (window.umami?.track) {
        window.umami.track((props) => ({
          ...props,
          title: document.title,
          url,
        }));
      }
    };

    const existingScript = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (window.umami?.track) {
      isScriptReadyRef.current = true;
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad);

      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.defer = true;
    script.src = scriptUrl;
    script.setAttribute("data-website-id", websiteId);
    script.setAttribute("data-auto-track", "false");
    script.setAttribute("data-do-not-track", "true");

    if (domains) {
      script.setAttribute("data-domains", domains);
    }

    if (hostUrl) {
      script.setAttribute("data-host-url", hostUrl);
    }

    script.addEventListener("load", handleLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
    };
  }, [
    domains,
    hostUrl,
    location.hash,
    location.pathname,
    location.search,
    scriptUrl,
    websiteId,
  ]);

  useEffect(() => {
    if (!isScriptReadyRef.current || !window.umami?.track) {
      return;
    }

    const url = `${location.pathname}${location.search}${location.hash}`;

    window.umami.track((props) => ({
      ...props,
      title: document.title,
      url,
    }));
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default UmamiAnalytics;
