import { calculateBasicMatchupScore } from "@/features/nba/lib/score";
import type { GameStatus, GameTeam } from "@/features/nba/types/game";

const ESPN_NBA_GAME_SUMMARY_URL =
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary";

type EspnLogo = {
    href?: string;
};

type EspnGameSummaryTeam = {
    id?: string;
    location?: string;
    name?: string;
    abbreviation?: string;
    displayName?: string;
    shortDisplayName?: string;
    color?: string;
    logos?: EspnLogo[];
    logo?: string;
};

type EspnGameSummaryCompetitor = {
    homeAway?: "home" | "away";
    team?: EspnGameSummaryTeam;
    score?: string;
    record?: Array<{
        type?: string;
        summary?: string;
        displayValue?: string;
    }>;
};

type EspnHeaderCompetition = {
    date?: string;
    competitors?: EspnGameSummaryCompetitor[];
    status?: {
        type?: {
            name?: string;
            state?: string;
            description?: string;
            detail?: string;
            shortDetail?: string;
        };
    };
    broadcasts?: Array<{
        media?: {
            shortName?: string;
        };
    }>;
};

type EspnBoxscoreTeam = {
    homeAway?: "home" | "away";
    statistics?: Array<{
        name?: string;
        displayValue?: string;
    }>;
};

type EspnGameSummaryResponse = {
    header?: {
        id?: string;
        competitions?: EspnHeaderCompetition[];
        gameNote?: string;
    };
    boxscore?: {
        teams?: EspnBoxscoreTeam[];
    };
    gameInfo?: {
        venue?: {
            fullName?: string;
            address?: {
                city?: string;
                state?: string;
            };
        };
    };
};

export type EspnGameSummaryDetail = {
    id: string;
    time: string;
    status: GameStatus;
    statusText: string;
    awayTeam: GameTeam;
    homeTeam: GameTeam;
    matchupScore: number;
    note?: string;
    venue?: string;
    broadcasts: string[];
    stats: {
        awayLastTen: string;
        homeLastTen: string;
        awayPpg: string;
        homePpg: string;
        awayOppPpg: string;
        homeOppPpg: string;
    };
};

function getEspnEventId(gameId: string) {
    return gameId.startsWith("espn-") ? gameId.slice(5) : gameId;
}

function normalizeEspnStatus(
    competition: EspnHeaderCompetition | undefined
): GameStatus {
    const state = competition?.status?.type?.state?.toLowerCase();
    const name = competition?.status?.type?.name?.toLowerCase();
    const description = competition?.status?.type?.description?.toLowerCase();

    if (state === "post" || name === "status_final") {
        return "final";
    }

    if (state === "in" || description?.includes("in progress")) {
        return "live";
    }

    if (description?.includes("postponed")) {
        return "postponed";
    }

    return "scheduled";
}

function formatStartTime(dateString: string | undefined) {
    if (!dateString) {
        return "-";
    }

    return new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
    }).format(new Date(dateString));
}

function toScore(score: string | undefined) {
    const numericScore = Number(score);

    return Number.isFinite(numericScore) ? numericScore : null;
}

function getRecord(competitor: EspnGameSummaryCompetitor | undefined) {
    return competitor?.record?.find((item) => item.type === "total")
        ?.displayValue;
}

function mapTeam(competitor: EspnGameSummaryCompetitor | undefined): GameTeam {
    const team = competitor?.team;
    const teamId = Number(team?.id);

    return {
        id: Number.isFinite(teamId) ? teamId : 0,
        name: team?.shortDisplayName ?? team?.name ?? "NBA",
        displayName:
            team?.displayName ?? team?.shortDisplayName ?? team?.name ?? "NBA",
        abbreviation: team?.abbreviation,
        city: team?.location,
        record: getRecord(competitor),
        score: toScore(competitor?.score),
        logoUrl: team?.logos?.[0]?.href ?? team?.logo ?? null,
    };
}

function getStat(
    team: EspnBoxscoreTeam | undefined,
    statName: string,
    fallback = "-"
) {
    return (
        team?.statistics?.find((stat) => stat.name === statName)
            ?.displayValue ?? fallback
    );
}

function getVenue(data: EspnGameSummaryResponse) {
    const venue = data.gameInfo?.venue;
    const location = [venue?.address?.city, venue?.address?.state]
        .filter(Boolean)
        .join(", ");

    if (!venue?.fullName) {
        return location || undefined;
    }

    return location ? `${venue.fullName} · ${location}` : venue.fullName;
}

export async function getEspnGameSummary(
    gameId: string
): Promise<EspnGameSummaryDetail | null> {
    const eventId = getEspnEventId(gameId);
    const params = new URLSearchParams({
        event: eventId,
    });
    const response = await fetch(`${ESPN_NBA_GAME_SUMMARY_URL}?${params}`, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        return null;
    }

    const data = (await response.json()) as EspnGameSummaryResponse;
    const competition = data.header?.competitions?.[0];
    const competitors = competition?.competitors ?? [];
    const homeCompetitor = competitors.find(
        (competitor) => competitor.homeAway === "home"
    );
    const awayCompetitor = competitors.find(
        (competitor) => competitor.homeAway === "away"
    );

    if (!homeCompetitor || !awayCompetitor) {
        return null;
    }

    const status = normalizeEspnStatus(competition);
    const homeTeam = mapTeam(homeCompetitor);
    const awayTeam = mapTeam(awayCompetitor);
    const boxscoreTeams = data.boxscore?.teams ?? [];
    const homeBoxscore = boxscoreTeams.find((team) => team.homeAway === "home");
    const awayBoxscore = boxscoreTeams.find((team) => team.homeAway === "away");

    return {
        id: gameId,
        time: formatStartTime(competition?.date),
        status,
        statusText:
            competition?.status?.type?.shortDetail ??
            competition?.status?.type?.detail ??
            competition?.status?.type?.description ??
            "Scheduled",
        awayTeam,
        homeTeam,
        matchupScore: calculateBasicMatchupScore({
            awayScore: awayTeam.score,
            homeScore: homeTeam.score,
            status,
        }),
        note: data.header?.gameNote,
        venue: getVenue(data),
        broadcasts: [
            ...new Set(
                (competition?.broadcasts ?? [])
                    .map((broadcast) => broadcast.media?.shortName)
                    .filter((item): item is string => Boolean(item))
            ),
        ],
        stats: {
            awayLastTen: getStat(awayBoxscore, "Last Ten Games"),
            homeLastTen: getStat(homeBoxscore, "Last Ten Games"),
            awayPpg: getStat(awayBoxscore, "avgPoints"),
            homePpg: getStat(homeBoxscore, "avgPoints"),
            awayOppPpg: getStat(awayBoxscore, "avgPointsAgainst"),
            homeOppPpg: getStat(homeBoxscore, "avgPointsAgainst"),
        },
    };
}
