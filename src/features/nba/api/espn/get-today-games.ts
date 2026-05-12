import {
    addDays,
    formatDateToKoreaYYYYMMDD,
    formatDateToYYYYMMDD,
} from "../../lib/date";
import { calculateBasicMatchupScore } from "../../lib/score";
import type { GameListItem, GameStatus, GameTeam } from "../../types/game";

const ESPN_NBA_SCOREBOARD_URL =
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";

type EspnScoreboardTeam = {
    id?: string;
    abbreviation?: string;
    displayName?: string;
    shortDisplayName?: string;
    name?: string;
    location?: string;
    logo?: string;
};

type EspnScoreboardCompetitor = {
    homeAway?: "home" | "away";
    score?: string;
    team?: EspnScoreboardTeam;
    records?: Array<{
        name?: string;
        type?: string;
        summary?: string;
    }>;
};

type EspnScoreboardCompetition = {
    competitors?: EspnScoreboardCompetitor[];
};

type EspnScoreboardEvent = {
    id?: string;
    date?: string;
    name?: string;
    shortName?: string;
    status?: {
        type?: {
            name?: string;
            state?: string;
            description?: string;
            detail?: string;
            shortDetail?: string;
        };
    };
    competitions?: EspnScoreboardCompetition[];
};

type EspnScoreboardResponse = {
    events?: EspnScoreboardEvent[];
};

type GetEspnTodayGamesOptions = {
    date?: Date;
};

function toEspnDateParam(date: Date): string {
    return formatDateToYYYYMMDD(date).replaceAll("-", "");
}

function normalizeEspnStatus(event: EspnScoreboardEvent): GameStatus {
    const state = event.status?.type?.state?.toLowerCase();
    const name = event.status?.type?.name?.toLowerCase();
    const description = event.status?.type?.description?.toLowerCase();

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

function toScore(score: string | undefined): number | null {
    const numericScore = Number(score);

    return Number.isFinite(numericScore) ? numericScore : null;
}

function mapEspnTeam(
    competitor: EspnScoreboardCompetitor | undefined
): GameTeam {
    const team = competitor?.team;
    const id = Number(team?.id);
    const record = competitor?.records?.find((item) => {
        return item.type === "total" || item.name === "overall";
    });

    return {
        id: Number.isFinite(id) ? id : 0,
        name: team?.shortDisplayName ?? team?.name ?? "NBA",
        displayName: team?.displayName ?? team?.shortDisplayName ?? "NBA",
        abbreviation: team?.abbreviation,
        city: team?.location,
        record: record?.summary,
        score: toScore(competitor?.score),
        logoUrl: team?.logo ?? null,
    };
}

function formatStartTime(dateString: string): string {
    return new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
    }).format(new Date(dateString));
}

function mapEspnEventToGameListItem(event: EspnScoreboardEvent): GameListItem {
    const competitors = event.competitions?.[0]?.competitors ?? [];
    const homeCompetitor = competitors.find(
        (competitor) => competitor.homeAway === "home"
    );
    const awayCompetitor = competitors.find(
        (competitor) => competitor.homeAway === "away"
    );
    const homeTeam = mapEspnTeam(homeCompetitor);
    const awayTeam = mapEspnTeam(awayCompetitor);
    const status = normalizeEspnStatus(event);
    const apiId = Number(event.id);

    return {
        id: event.id ? `espn-${event.id}` : event.shortName ?? event.name ?? "espn-game",
        apiId: Number.isFinite(apiId) ? apiId : 0,
        date: event.date ?? new Date().toISOString(),
        startTime: event.date ? formatStartTime(event.date) : "-",
        status,
        statusText:
            event.status?.type?.shortDetail ??
            event.status?.type?.detail ??
            event.status?.type?.description ??
            "Scheduled",
        homeTeam,
        awayTeam,
        matchupScore: calculateBasicMatchupScore({
            homeScore: homeTeam.score,
            awayScore: awayTeam.score,
            status,
        }),
        summary: event.shortName ?? `${awayTeam.displayName} vs ${homeTeam.displayName}`,
    };
}

async function getEspnGamesByDate(date: Date): Promise<GameListItem[]> {
    const params = new URLSearchParams({
        dates: toEspnDateParam(date),
    });

    const response = await fetch(`${ESPN_NBA_SCOREBOARD_URL}?${params}`, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        throw new Error(`ESPN scoreboard request failed: ${response.status}`);
    }

    const data = (await response.json()) as EspnScoreboardResponse;

    return (data.events ?? []).map(mapEspnEventToGameListItem);
}

export async function getEspnTodayGames(
    options: GetEspnTodayGamesOptions = {}
): Promise<GameListItem[]> {
    const baseDate = options.date ?? new Date();
    const requestDates = [
        addDays(baseDate, -1),
        baseDate,
        addDays(baseDate, 1),
        addDays(baseDate, 2),
    ];
    const targetKoreaDate = formatDateToKoreaYYYYMMDD(baseDate);
    const games = (
        await Promise.all(requestDates.map((date) => getEspnGamesByDate(date)))
    ).flat();
    const todayGames = games.filter((game) => {
        return formatDateToKoreaYYYYMMDD(new Date(game.date)) === targetKoreaDate;
    });

    return todayGames.length > 0 ? todayGames : games;
}
