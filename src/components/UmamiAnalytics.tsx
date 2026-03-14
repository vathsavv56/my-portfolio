import { useEffect, useState } from "react";
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
  const [isReady, setIsReady] = useState(Boolean(window.umami?.track));

  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim();
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();
  const domains = import.meta.env.VITE_UMAMI_DOMAINS?.trim();
  const hostUrl = import.meta.env.VITE_UMAMI_HOST_URL?.trim();

  useEffect(() => {
    if (!scriptUrl || !websiteId) {
      return;
    }

    const handleLoad = () => setIsReady(true);
    const existingScript = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (window.umami?.track) {
      setIsReady(true);
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
  }, [domains, hostUrl, scriptUrl, websiteId]);

  useEffect(() => {
    if (!isReady || !window.umami?.track) {
      return;
    }

    const url = `${location.pathname}${location.search}${location.hash}`;

    window.umami.track((props) => ({
      ...props,
      title: document.title,
      url,
    }));
  }, [isReady, location.hash, location.pathname, location.search]);

  return null;
};

export default UmamiAnalytics;
