import type { GameListItem } from "../types/game";
import { getTodayGames } from "./api-sports/get-today-games";
import { getEspnTodayGames } from "./espn/get-today-games";
import { getTeamArtworkByAbbr } from "./thesportsdb/get-team-artwork-by-abbr";

async function attachArtworkToGame(game: GameListItem): Promise<GameListItem> {
    const [homeArtwork, awayArtwork] = await Promise.all([
        getTeamArtworkByAbbr(game.homeTeam.abbreviation),
        getTeamArtworkByAbbr(game.awayTeam.abbreviation),
    ]);

    return {
        ...game,
        homeTeam: {
            ...game.homeTeam,
            logoUrl:
                homeArtwork?.strBadge ??
                homeArtwork?.strLogo ??
                game.homeTeam.logoUrl,
        },
        awayTeam: {
            ...game.awayTeam,
            logoUrl:
                awayArtwork?.strBadge ??
                awayArtwork?.strLogo ??
                game.awayTeam.logoUrl,
        },
    };
}

export async function getTodayGamesWithArtwork(): Promise<GameListItem[]> {
    let games: GameListItem[] = [];

    try {
        games = await getTodayGames();
    } catch (error) {
        console.error("[getTodayGamesWithArtwork] API-SPORTS failed:", error);
    }

    if (games.length === 0) {
        games = await getEspnTodayGames();
    }

    return Promise.all(games.map(attachArtworkToGame));
}
