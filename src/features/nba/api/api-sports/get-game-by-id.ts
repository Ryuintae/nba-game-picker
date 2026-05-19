import { mapApiSportsGameToGameListItem } from "../../mappers/game.mapper";
import type { ApiSportsGamesResponse } from "../../types/api-sports";
import type { GameListItem } from "../../types/game";
import { apiSportsFetch } from "./client";

export async function getApiSportsGameById(
    gameId: string
): Promise<GameListItem | null> {
    const data = await apiSportsFetch<ApiSportsGamesResponse>(
        `/games?id=${gameId}`,
        {
            revalidate: 60,
        }
    );
    const game = data.response?.[0];

    return game ? mapApiSportsGameToGameListItem(game) : null;
}
