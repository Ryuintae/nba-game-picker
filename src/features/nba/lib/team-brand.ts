import {
    FALLBACK_TEAM_BRAND,
    TEAM_BRAND_MAP,
    TEAM_NAME_ALIASES,
} from "../constants/team-brand";
import type { TeamBrand } from "../types/home";

function normalizeTeamName(teamName: string) {
    return teamName.trim().toLowerCase();
}

export function getTeamBrand(teamName: string): TeamBrand {
    const normalized = normalizeTeamName(teamName);
    const alias = TEAM_NAME_ALIASES[normalized];

    if (!alias) {
        return FALLBACK_TEAM_BRAND;
    }

    return TEAM_BRAND_MAP[alias] ?? FALLBACK_TEAM_BRAND;
}

export function getMatchupGradient(awayTeam: string, homeTeam: string) {
    const away = getTeamBrand(awayTeam);
    const home = getTeamBrand(homeTeam);

    return {
        background: `linear-gradient(135deg, ${away.secondary} 0%, ${home.secondary} 100%)`,
    };
}