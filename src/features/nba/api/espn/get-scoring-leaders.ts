import type {
    PlayerLeaderCategory,
    ScoringLeader,
} from "../../types/home";

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

type LeaderCategoryConfig = {
    key: PlayerLeaderCategory["key"];
    label: string;
    statLabel: PlayerLeaderCategory["statLabel"];
    sort: string;
    rankCategory: string;
    rankStat: string;
};

type GetPlayerLeaderCategoriesOptions = {
    limit?: number;
    season?: number;
};

const LEADER_CATEGORY_CONFIGS: LeaderCategoryConfig[] = [
    {
        key: "scoring",
        label: "득점",
        statLabel: "PPG",
        sort: "offensive.avgPoints:desc",
        rankCategory: "offensive",
        rankStat: "avgPoints",
    },
    {
        key: "assists",
        label: "어시스트",
        statLabel: "APG",
        sort: "offensive.avgAssists:desc",
        rankCategory: "offensive",
        rankStat: "avgAssists",
    },
    {
        key: "threePointers",
        label: "3점슛",
        statLabel: "3PM",
        sort: "offensive.avgThreePointFieldGoalsMade:desc",
        rankCategory: "offensive",
        rankStat: "avgThreePointFieldGoalsMade",
    },
];

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

function mapEntryToPlayerLeader(
    entry: EspnAthleteStatsEntry,
    index: number,
    config: LeaderCategoryConfig
): ScoringLeader {
    const ppg = toOneDecimal(
        getStatValue(entry.categories, "offensive", "avgPoints")
    );
    const apg = toOneDecimal(
        getStatValue(entry.categories, "offensive", "avgAssists")
    );
    const rpg = toOneDecimal(
        getStatValue(entry.categories, "general", "avgRebounds")
    );
    const threePointersMade = toOneDecimal(
        getStatValue(
            entry.categories,
            "offensive",
            "avgThreePointFieldGoalsMade"
        )
    );

    return {
        rank: getRank(
            entry.categories,
            config.rankCategory,
            config.rankStat,
            index + 1
        ),
        name: entry.athlete.displayName ?? "Unknown Player",
        team: entry.athlete.teamShortName ?? entry.athlete.teamName ?? "NBA",
        position: entry.athlete.position?.abbreviation,
        gamesPlayed: getStatValue(entry.categories, "general", "gamesPlayed"),
        leaderValue: toOneDecimal(
            getStatValue(entry.categories, config.rankCategory, config.rankStat)
        ),
        ppg,
        apg,
        rpg,
        threePointersMade,
        headshotUrl: entry.athlete.headshot?.href ?? null,
        teamLogoUrl: entry.athlete.teamLogos?.[0]?.href ?? null,
    };
}

async function getPlayerLeadersByCategory(
    config: LeaderCategoryConfig,
    options: Required<GetPlayerLeaderCategoriesOptions>
): Promise<PlayerLeaderCategory> {
    const params = new URLSearchParams({
        region: "us",
        lang: "en",
        contentorigin: "espn",
        isqualified: "true",
        page: "1",
        limit: String(options.limit),
        sort: config.sort,
        season: String(options.season),
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
        throw new Error(
            `ESPN ${config.key} leaders request failed: ${response.status}`
        );
    }

    const data = (await response.json()) as EspnAthleteStatsResponse;

    return {
        key: config.key,
        label: config.label,
        statLabel: config.statLabel,
        players: (data.athletes ?? []).map((entry, index) =>
            mapEntryToPlayerLeader(entry, index, config)
        ),
    };
}

export async function getPlayerLeaderCategories(
    options: GetPlayerLeaderCategoriesOptions = {}
): Promise<PlayerLeaderCategory[]> {
    const resolvedOptions = {
        limit: options.limit ?? 10,
        season: options.season ?? DEFAULT_ESPN_NBA_STATS_SEASON,
    };

    return Promise.all(
        LEADER_CATEGORY_CONFIGS.map((config) =>
            getPlayerLeadersByCategory(config, resolvedOptions)
        )
    );
}
