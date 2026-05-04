import { apiSportsFetch } from "./client";
import type { ApiSportsGamesResponse } from "../../types/api-sports";
import type { GameListItem } from "../../types/game";
import {
    addDays,
    formatDateToKoreaYYYYMMDD,
    formatDateToYYYYMMDD,
} from "../../lib/date";
import { mapApiSportsGameToGameListItem } from "../../mappers/game.mapper";

type GetTodayGamesOptions = {
    date?: Date;
};

export async function getTodayGames(
    options: GetTodayGamesOptions = {}
): Promise<GameListItem[]> {
    const baseDate = options.date ?? new Date();

    const requestDates = [
        formatDateToYYYYMMDD(addDays(baseDate, -1)),
        formatDateToYYYYMMDD(baseDate),
        formatDateToYYYYMMDD(addDays(baseDate, 1)),
    ];

    const targetKoreaDate = formatDateToKoreaYYYYMMDD(baseDate);

    const responses = await Promise.all(
        requestDates.map((date) =>
            apiSportsFetch<ApiSportsGamesResponse>(`/games?date=${date}`, {
                revalidate: 60,
            })
        )
    );

    const apiGames = responses.flatMap((data) => data.response ?? []);

    const todayGames = apiGames.filter((game) => {
        const gameKoreaDate = formatDateToKoreaYYYYMMDD(
            new Date(game.date.start)
        );

        return gameKoreaDate === targetKoreaDate;
    });

    return todayGames.map(mapApiSportsGameToGameListItem);
}