import type { GameListItem } from "../types/game";
import { getTodayGames } from "./api-sports/get-today-games";
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
    const games = await getTodayGames();

    return Promise.all(games.map(attachArtworkToGame));
}