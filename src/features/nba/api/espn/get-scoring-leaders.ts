import type { ScoringLeader } from "../../types/home";

const ESPN_NBA_PLAYER_STATS_URL =
    "https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete";

export const DEFAULT_ESPN_NBA_STATS_SEASON = 2026;

type EspnStatCategory = {
    name: string;
    names?: string[];
    values?: number[];
    ranks?: string[];
};

type EspnAthleteStatsEntry = {
    athlete: {
        displayName?: string;
        position?: {
            abbreviation?: string;
        };
        headshot?: {
            href?: string;
        };
        teamName?: string;
        teamShortName?: string;
        teamLogos?: Array<{
            href?: string;
        }>;
    };
    categories?: EspnStatCategory[];
};

type EspnAthleteStatsResponse = {
    athletes?: EspnAthleteStatsEntry[];
};

type GetScoringLeadersOptions = {
    limit?: number;
    season?: number;
};

function getStatValue(
    categories: EspnStatCategory[] | undefined,
    categoryName: string,
    statName: string
): number | undefined {
    const category = categories?.find((item) => item.name === categoryName);
    const statIndex = category?.names?.indexOf(statName) ?? -1;

    if (statIndex < 0) {
        return undefined;
    }

    return category?.values?.[statIndex];
}

function getRank(
    categories: EspnStatCategory[] | undefined,
    categoryName: string,
    statName: string,
    fallbackRank: number
): number {
    const category = categories?.find((item) => item.name === categoryName);
    const statIndex = category?.names?.indexOf(statName) ?? -1;
    const rank = Number(category?.ranks?.[statIndex]);

    return Number.isFinite(rank) && rank > 0 ? rank : fallbackRank;
}

function toOneDecimal(value: number | undefined): number {
    return Number((value ?? 0).toFixed(1));
}

function mapEntryToScoringLeader(
    entry: EspnAthleteStatsEntry,
    index: number
): ScoringLeader {
    return {
        rank: getRank(entry.categories, "offensive", "avgPoints", index + 1),
        name: entry.athlete.displayName ?? "Unknown Player",
        team: entry.athlete.teamShortName ?? entry.athlete.teamName ?? "NBA",
        position: entry.athlete.position?.abbreviation,
        gamesPlayed: getStatValue(entry.categories, "general", "gamesPlayed"),
        ppg: toOneDecimal(
            getStatValue(entry.categories, "offensive", "avgPoints")
        ),
        apg: toOneDecimal(
            getStatValue(entry.categories, "offensive", "avgAssists")
        ),
        rpg: toOneDecimal(
            getStatValue(entry.categories, "general", "avgRebounds")
        ),
        headshotUrl: entry.athlete.headshot?.href ?? null,
        teamLogoUrl: entry.athlete.teamLogos?.[0]?.href ?? null,
    };
}

export async function getScoringLeaders(
    options: GetScoringLeadersOptions = {}
): Promise<ScoringLeader[]> {
    const params = new URLSearchParams({
        region: "us",
        lang: "en",
        contentorigin: "espn",
        isqualified: "true",
        page: "1",
        limit: String(options.limit ?? 8),
        sort: "offensive.avgPoints:desc",
        season: String(options.season ?? DEFAULT_ESPN_NBA_STATS_SEASON),
        seasontype: "2",
    });

    const response = await fetch(`${ESPN_NBA_PLAYER_STATS_URL}?${params}`, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
        next: {
            revalidate: 60 * 60,
        },
    });

    if (!response.ok) {
        throw new Error(`ESPN scoring leaders request failed: ${response.status}`);
    }

    const data = (await response.json()) as EspnAthleteStatsResponse;

    return (data.athletes ?? []).map(mapEntryToScoringLeader);
}
