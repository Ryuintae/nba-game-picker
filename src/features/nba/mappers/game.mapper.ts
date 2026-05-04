import type { ApiSportsGame, ApiSportsTeam } from "../types/api-sports";
import type { GameListItem, GameStatus, GameTeam } from "../types/game";
import { calculateBasicMatchupScore } from "../lib/score";

function normalizeStatus(game: ApiSportsGame): GameStatus {
    const shortStatus = String(game.status?.short ?? "").toLowerCase();
    const longStatus = String(game.status?.long ?? "").toLowerCase();

    if (
        shortStatus === "ft" ||
        shortStatus === "aot" ||
        longStatus.includes("finished")
    ) {
        return "final";
    }

    if (
        shortStatus === "q1" ||
        shortStatus === "q2" ||
        shortStatus === "q3" ||
        shortStatus === "q4" ||
        shortStatus === "ot" ||
        longStatus.includes("in play")
    ) {
        return "live";
    }

    if (
        shortStatus === "pst" ||
        longStatus.includes("postponed")
    ) {
        return "postponed";
    }

    return "scheduled";
}

function mapTeam(team: ApiSportsTeam, score?: number | null): GameTeam {
    return {
        id: team.id,
        name: team.nickname ?? team.name,
        displayName: team.name,
        abbreviation: team.code,
        city: team.city,
        score,
        logoUrl: team.logo ?? null,
    };
}

function formatStartTime(dateString: string): string {
    return new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(dateString));
}

export function mapApiSportsGameToGameListItem(
    game: ApiSportsGame
): GameListItem {
    const homeTeam = mapTeam(game.teams.home, game.scores.home.points);
    const awayTeam = mapTeam(game.teams.visitors, game.scores.visitors.points);

    return {
        id: String(game.id),
        apiId: game.id,
        date: game.date.start,
        startTime: formatStartTime(game.date.start),
        status: normalizeStatus(game),
        statusText: game.status.long ?? "Scheduled",
        homeTeam,
        awayTeam,
        matchupScore: calculateBasicMatchupScore({
            homeScore: homeTeam.score,
            awayScore: awayTeam.score,
            status: normalizeStatus(game),
        }),
        summary: `${awayTeam.displayName} vs ${homeTeam.displayName}`,
    };
}