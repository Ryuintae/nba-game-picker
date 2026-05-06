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
    const normalizedName = normalizeTeamName(teamName);
    const teamKey = TEAM_NAME_ALIASES[normalizedName] ?? normalizedName;

    return TEAM_BRAND_MAP[teamKey] ?? FALLBACK_TEAM_BRAND;
}

export function getMatchupGradient(awayTeam: string, homeTeam: string) {
    const awayBrand = getTeamBrand(awayTeam);
    const homeBrand = getTeamBrand(homeTeam);

    return {
        background: `
            radial-gradient(circle at 18% 18%, ${awayBrand.secondary} 0%, transparent 30%),
            radial-gradient(circle at 82% 18%, ${homeBrand.secondary} 0%, transparent 30%),
            linear-gradient(135deg, ${awayBrand.primary} 0%, ${awayBrand.primary} 34%, ${homeBrand.primary} 100%)
        `,
    };
}