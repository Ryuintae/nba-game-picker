const API_SPORTS_BASE_URL = "https://v2.nba.api-sports.io";

type ApiSportsFetchOptions = {
    revalidate?: number;
};

export async function apiSportsFetch<T>(
    path: string,
    options: ApiSportsFetchOptions = {}
): Promise<T> {
    const apiKey = process.env.API_SPORTS_NBA_KEY;

    if (!apiKey) {
        throw new Error("API_SPORTS_NBA_KEY is not defined");
    }

    const response = await fetch(`${API_SPORTS_BASE_URL}${path}`, {
        headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "v2.nba.api-sports.io",
        },
        next: {
            revalidate: options.revalidate ?? 60,
        },
    });

    if (!response.ok) {
        throw new Error(`API-SPORTS request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}