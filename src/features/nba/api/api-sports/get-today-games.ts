import { apiSportsFetch } from "./client";
import type { ApiSportsGamesResponse } from "../../types/api-sports";
import type { GameListItem } from "../../types/game";
import { formatDateToYYYYMMDD } from "../../lib/date";
import { mapApiSportsGameToGameListItem } from "../../mappers/game.mapper";

type GetTodayGamesOptions = {
    date?: Date;
};

export async function getTodayGames(
    options: GetTodayGamesOptions = {}
): Promise<GameListItem[]> {
    const date = formatDateToYYYYMMDD(options.date ?? new Date());

    console.log("[NBA API] request date:", date);

    const data = await apiSportsFetch<ApiSportsGamesResponse>(
        `/games?date=${date}`,
        {
            revalidate: 60,
        }
    );

    return data.response.map(mapApiSportsGameToGameListItem);
}