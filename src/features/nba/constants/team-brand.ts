import type { TeamBrand } from "../types/home";

export const TEAM_BRAND_MAP: Record<string, TeamBrand> = {
    lakers: {
        primary: "#552583",
        secondary: "#FDB927",
        surface: "rgba(85, 37, 131, 0.14)",
        ring: "rgba(85, 37, 131, 0.24)",
    },
    warriors: {
        primary: "#1D428A",
        secondary: "#FFC72C",
        surface: "rgba(29, 66, 138, 0.14)",
        ring: "rgba(29, 66, 138, 0.24)",
    },
    celtics: {
        primary: "#007A33",
        secondary: "#BA9653",
        surface: "rgba(0, 122, 51, 0.14)",
        ring: "rgba(0, 122, 51, 0.24)",
    },
    bucks: {
        primary: "#00471B",
        secondary: "#EEE1C6",
        surface: "rgba(0, 71, 27, 0.14)",
        ring: "rgba(0, 71, 27, 0.24)",
    },
    nuggets: {
        primary: "#0E2240",
        secondary: "#FEC524",
        surface: "rgba(14, 34, 64, 0.14)",
        ring: "rgba(14, 34, 64, 0.24)",
    },
    suns: {
        primary: "#1D1160",
        secondary: "#E56020",
        surface: "rgba(29, 17, 96, 0.14)",
        ring: "rgba(29, 17, 96, 0.24)",
    },
    knicks: {
        primary: "#006BB6",
        secondary: "#F58426",
        surface: "rgba(0, 107, 182, 0.14)",
        ring: "rgba(0, 107, 182, 0.24)",
    },
    heat: {
        primary: "#98002E",
        secondary: "#F9A01B",
        surface: "rgba(152, 0, 46, 0.14)",
        ring: "rgba(152, 0, 46, 0.24)",
    },
    mavericks: {
        primary: "#00538C",
        secondary: "#B8C4CA",
        surface: "rgba(0, 83, 140, 0.14)",
        ring: "rgba(0, 83, 140, 0.24)",
    },
    thunder: {
        primary: "#007AC1",
        secondary: "#EF3B24",
        surface: "rgba(0, 122, 193, 0.14)",
        ring: "rgba(0, 122, 193, 0.24)",
    },
    timberwolves: {
        primary: "#0C2340",
        secondary: "#236192",
        surface: "rgba(12, 35, 64, 0.14)",
        ring: "rgba(12, 35, 64, 0.24)",
    },
};

export const TEAM_NAME_ALIASES: Record<string, string> = {
    "los angeles lakers": "lakers",
    lakers: "lakers",

    "golden state warriors": "warriors",
    warriors: "warriors",

    "boston celtics": "celtics",
    celtics: "celtics",

    "milwaukee bucks": "bucks",
    bucks: "bucks",

    "denver nuggets": "nuggets",
    nuggets: "nuggets",

    "phoenix suns": "suns",
    suns: "suns",

    "new york knicks": "knicks",
    knicks: "knicks",

    "miami heat": "heat",
    heat: "heat",

    "dallas mavericks": "mavericks",
    mavericks: "mavericks",

    "oklahoma city thunder": "thunder",
    thunder: "thunder",

    "minnesota timberwolves": "timberwolves",
    timberwolves: "timberwolves",
};

export const FALLBACK_TEAM_BRAND: TeamBrand = {
    primary: "#64748B",
    secondary: "#CBD5E1",
    surface: "rgba(100, 116, 139, 0.14)",
    ring: "rgba(100, 116, 139, 0.24)",
};