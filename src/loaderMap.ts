export const loaderKeys = [
  "arabic",
  "bulgarian",
  "catlan",
  "chinese-hk",
  "chinese-simplified",
  "chinese-traditional",
  "croatian",
  "czech",
  "danish",
  "dutch",
  "english",
  "finnish",
  "french",
  "german",
  "hebrew",
  "hindi",
  "hungarian",
  "indoneshian",
  "italian",
  "japanese",
  "kazakh",
  "korean",
  "malay",
  "norwegian-bokmai",
  "polish",
  "portugese",
  "portugese-brazil",
  "romanian",
  "russian",
  "slovak",
  "spanish",
  "swedish",
  "thai",
  "turkish",
  "ukranian",
  "vietnamese",
  "greek",
] as const;

export type LoaderKey = (typeof loaderKeys)[number];

export const DEFAULT_LOADER: LoaderKey = "english";

export const countryToLoader: Record<string, LoaderKey> = {
  SA: "arabic",
  AE: "arabic",
  EG: "arabic",
  KW: "arabic",
  QA: "arabic",
  BH: "arabic",
  OM: "arabic",
  JO: "arabic",
  IQ: "arabic",
  LB: "arabic",
  LY: "arabic",
  TN: "arabic",
  DZ: "arabic",
  MA: "arabic",
  YE: "arabic",

  BG: "bulgarian",
  HK: "chinese-hk",
  CN: "chinese-simplified",
  TW: "chinese-traditional",
  HR: "croatian",
  CZ: "czech",
  DK: "danish",
  NL: "dutch",

  US: "english",
  GB: "english",
  AU: "english",
  CA: "english",
  NZ: "english",
  IE: "english",

  FI: "finnish",

  FR: "french",
  LU: "french",
  MC: "french",

  DE: "german",
  AT: "german",
  LI: "german",

  IL: "hebrew",
  IN: "hindi",
  HU: "hungarian",
  ID: "indoneshian",

  IT: "italian",
  SM: "italian",
  VA: "italian",

  JP: "japanese",
  KZ: "kazakh",
  KR: "korean",

  MY: "malay",
  BN: "malay",

  NO: "norwegian-bokmai",
  PL: "polish",
  PT: "portugese",
  BR: "portugese-brazil",

  RO: "romanian",
  MD: "romanian",

  RU: "russian",
  BY: "russian",

  SK: "slovak",

  ES: "spanish",
  MX: "spanish",
  AR: "spanish",
  CO: "spanish",
  CL: "spanish",
  PE: "spanish",
  VE: "spanish",
  EC: "spanish",
  BO: "spanish",
  PY: "spanish",
  UY: "spanish",
  CU: "spanish",
  DO: "spanish",
  HN: "spanish",
  SV: "spanish",
  GT: "spanish",
  CR: "spanish",
  PA: "spanish",
  NI: "spanish",

  SE: "swedish",
  TH: "thai",
  TR: "turkish",
  UA: "ukranian",
  VN: "vietnamese",
};

export const isLoaderKey = (value: string): value is LoaderKey => {
  return loaderKeys.includes(value as LoaderKey);
};

export const mapCountryToLoader = (
  countryCode: string | null | undefined,
): LoaderKey => {
  if (!countryCode) return DEFAULT_LOADER;
  return countryToLoader[countryCode.toUpperCase()] ?? DEFAULT_LOADER;
};
