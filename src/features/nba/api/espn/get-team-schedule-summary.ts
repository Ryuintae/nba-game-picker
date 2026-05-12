import type { RecentGameResult } from "../../types/home";

const ESPN_NBA_TEAM_SCHEDULE_URL =
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams";

export const DEFAULT_ESPN_NBA_TEAM_SCHEDULE_SEASON = 2026;

type EspnScheduleTeam = {
    abbreviation?: string;
    displayName?: string;
    shortDisplayName?: string;
};

type EspnScheduleCompetitor = {
    homeAway?: "home" | "away";
    winner?: boolean;
    team?: EspnScheduleTeam;
    score?: {
        displayValue?: string;
        value?: number;
    };
};

type EspnScheduleEvent = {
    id?: string;
    date?: string;
    competitions?: Array<{
        competitors?: EspnScheduleCompetitor[];
        status?: {
            type?: {
                state?: string;
                name?: string;
                completed?: boolean;
            };
        };
    }>;
};

type EspnTeamScheduleResponse = {
    events?: EspnScheduleEvent[];
};

type TeamScheduleOptions = {
    teamAbbr?: string;
    beforeDate?: string;
    season?: number;
};

type GetHeadToHeadSummaryOptions = TeamScheduleOptions & {
    opponentAbbr?: string;
    limit?: number;
};

type GetRecentGameResultsOptions = TeamScheduleOptions & {
    limit?: number;
};

function isFinalEvent(event: EspnScheduleEvent): boolean {
    const statusType = event.competitions?.[0]?.status?.type;

    return (
        statusType?.completed === true ||
        statusType?.state === "post" ||
        statusType?.name === "STATUS_FINAL"
    );
}

function getCompetitors(event: EspnScheduleEvent): EspnScheduleCompetitor[] {
    return event.competitions?.[0]?.competitors ?? [];
}

function hasTeam(event: EspnScheduleEvent, abbreviation: string): boolean {
    return getCompetitors(event).some((competitor) => {
        return competitor.team?.abbreviation === abbreviation;
    });
}

function getWinnerAbbr(event: EspnScheduleEvent): string | null {
    const winner = getCompetitors(event).find((competitor) => competitor.winner);

    return winner?.team?.abbreviation ?? null;
}

function getTeamCompetitor(
    event: EspnScheduleEvent,
    teamAbbr: string
): EspnScheduleCompetitor | undefined {
    return getCompetitors(event).find((competitor) => {
        return competitor.team?.abbreviation === teamAbbr;
    });
}

function getOpponentCompetitor(
    event: EspnScheduleEvent,
    teamAbbr: string
): EspnScheduleCompetitor | undefined {
    return getCompetitors(event).find((competitor) => {
        return competitor.team?.abbreviation !== teamAbbr;
    });
}

function getCompletedGamesBefore(
    events: EspnScheduleEvent[],
    beforeDate?: string
): EspnScheduleEvent[] {
    const cutoffTime = beforeDate ? new Date(beforeDate).getTime() : Date.now();

    return events
        .filter((event) => {
            const eventTime = event.date ? new Date(event.date).getTime() : 0;

            return (
                Number.isFinite(eventTime) &&
                eventTime <= cutoffTime &&
                isFinalEvent(event)
            );
        })
        .sort((a, b) => {
            return (
                new Date(b.date ?? 0).getTime() -
                new Date(a.date ?? 0).getTime()
            );
        });
}

async function getTeamSchedule({
    teamAbbr,
    season = DEFAULT_ESPN_NBA_TEAM_SCHEDULE_SEASON,
}: TeamScheduleOptions): Promise<EspnScheduleEvent[]> {
    if (!teamAbbr) {
        return [];
    }

    const params = new URLSearchParams({
        season: String(season),
    });
    const response = await fetch(
        `${ESPN_NBA_TEAM_SCHEDULE_URL}/${teamAbbr.toLowerCase()}/schedule?${params}`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
            next: {
                revalidate: 60 * 60,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`ESPN team schedule request failed: ${response.status}`);
    }

    const data = (await response.json()) as EspnTeamScheduleResponse;

    return data.events ?? [];
}

export async function getHeadToHeadSummary({
    teamAbbr,
    opponentAbbr,
    beforeDate,
    season,
    limit = 5,
}: GetHeadToHeadSummaryOptions): Promise<string> {
    if (!teamAbbr || !opponentAbbr) {
        return "-";
    }

    const events = await getTeamSchedule({ teamAbbr, season });
    const headToHeadGames = getCompletedGamesBefore(events, beforeDate)
        .filter((event) => {
            return hasTeam(event, teamAbbr) && hasTeam(event, opponentAbbr);
        })
        .slice(0, limit);

    if (headToHeadGames.length === 0) {
        return "-";
    }

    const teamWins = headToHeadGames.filter((event) => {
        return getWinnerAbbr(event) === teamAbbr;
    }).length;
    const opponentWins = headToHeadGames.filter((event) => {
        return getWinnerAbbr(event) === opponentAbbr;
    }).length;

    return `최근 ${headToHeadGames.length}전 ${teamAbbr} ${teamWins}승 ${opponentWins}패`;
}

export async function getRecentGameResults({
    teamAbbr,
    beforeDate,
    season,
    limit = 3,
}: GetRecentGameResultsOptions): Promise<RecentGameResult[]> {
    if (!teamAbbr) {
        return [];
    }

    const events = await getTeamSchedule({ teamAbbr, season });

    return getCompletedGamesBefore(events, beforeDate)
        .slice(0, limit)
        .map((event) => {
            const team = getTeamCompetitor(event, teamAbbr);
            const opponent = getOpponentCompetitor(event, teamAbbr);
            const teamScore = team?.score?.displayValue ?? "-";
            const opponentScore = opponent?.score?.displayValue ?? "-";
            const result = team?.winner ? "W" : "L";

            return {
                opponent:
                    opponent?.team?.shortDisplayName ??
                    opponent?.team?.displayName ??
                    opponent?.team?.abbreviation ??
                    "NBA",
                result,
                score: `${teamScore}-${opponentScore}`,
            };
        });
}
