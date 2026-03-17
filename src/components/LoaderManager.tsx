import { lazy, Suspense, useEffect, useState } from "react";
import Toast from "./Toast";
import luffyImg from "../assets/luffy.jpeg";

import { DEFAULT_LOADER } from "../loaderMap";
import type { LoaderKey } from "../loaderMap";
import { useLoader } from "../hooks/useLoader";

type LoaderManagerProps = {
  onComplete: () => void;
};

type LoaderComponentModule = {
  default: React.ComponentType;
};

const LOADER_ANIMATION_DURATION_MS = 6000;
const LOADER_END_PAUSE_DURATION_MS = 1000;
const TOTAL_LOADER_DURATION_MS =
  LOADER_ANIMATION_DURATION_MS + LOADER_END_PAUSE_DURATION_MS;

const loaderComponents: Record<
  LoaderKey,
  () => Promise<LoaderComponentModule>
> = {
  arabic: () => import("./loaders/ArabicLoader"),
  bulgarian: () => import("./loaders/BulgarianLoader"),
  catlan: () => import("./loaders/CatlanLoader"),
  "chinese-hk": () => import("./loaders/ChineseHongKongLoader"),
  "chinese-simplified": () => import("./loaders/ChineseSimplifiedLoader"),
  "chinese-traditional": () => import("./loaders/ChineseTraditionalLoader"),
  croatian: () => import("./loaders/CroatianLoader"),
  czech: () => import("./loaders/CzechLoader"),
  danish: () => import("./loaders/DanishLoader"),
  dutch: () => import("./loaders/DutchLoader"),
  english: () => import("./loaders/EnglishLoader"),
  finnish: () => import("./loaders/FinnishLoader"),
  french: () => import("./loaders/FrenchLoader"),
  german: () => import("./loaders/GermanLoader"),
  hebrew: () => import("./loaders/HebrewLoader"),
  hindi: () => import("./loaders/HindiLoader"),
  hungarian: () => import("./loaders/HungarianLoader"),
  indoneshian: () => import("./loaders/IndoneshianLoader"),
  italian: () => import("./loaders/ItalianLoader"),
  japanese: () => import("./loaders/JapaneseLoader"),
  kazakh: () => import("./loaders/KazakhLoader"),
  korean: () => import("./loaders/KoreanLoader"),
  malay: () => import("./loaders/MalayLoader"),
  "norwegian-bokmai": () => import("./loaders/NorwegianBokmaiLoader"),
  polish: () => import("./loaders/PolishLoader"),
  portugese: () => import("./loaders/PortugeseLoader"),
  "portugese-brazil": () => import("./loaders/PortugeseBrazilLoader"),
  romanian: () => import("./loaders/RomanianLoader"),
  russian: () => import("./loaders/RussianLoader"),
  slovak: () => import("./loaders/SlovakLoader"),
  spanish: () => import("./loaders/SpanishLoader"),
  swedish: () => import("./loaders/SwedishLoader"),
  thai: () => import("./loaders/ThaiLoader"),
  turkish: () => import("./loaders/TurkishLoader"),
  ukranian: () => import("./loaders/UkranianLoader"),
  vietnamese: () => import("./loaders/VietnameseLoader"),
  greek: () => import("./loaders/GreekLoader"),
};

const lazyLoaderComponents: Record<
  LoaderKey,
  React.LazyExoticComponent<React.ComponentType<unknown>>
> = Object.fromEntries(
  Object.entries(loaderComponents).map(([key, importer]) => [
    key,
    lazy(importer),
  ]),
) as Record<LoaderKey, React.LazyExoticComponent<React.ComponentType<unknown>>>;

const LoaderManager = ({ onComplete }: LoaderManagerProps) => {
  const loaderKey = useLoader();

  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, TOTAL_LOADER_DURATION_MS);

    // Hide toast after 2.5s
    const toastTimer = window.setTimeout(() => setShowToast(false), 2500);

    return () => window.clearTimeout(timer);
    // Also clear toast timer
    window.clearTimeout(toastTimer);
  }, [onComplete]);

  if (!loaderKey) return null;
  const LoaderComponent =
    lazyLoaderComponents[loaderKey] ?? lazyLoaderComponents[DEFAULT_LOADER];

  return (
    <>
      {showToast && (
        <Toast
          message={`Showing loader: ${loaderKey}`}
          imageUrl={luffyImg}
          onClose={() => setShowToast(false)}
        />
      )}
      <Suspense fallback={null}>
        <LoaderComponent />
      </Suspense>
    </>
  );
};

export default LoaderManager;
