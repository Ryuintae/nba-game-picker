export type ApiSportsTeam = {
    id: number;
    name: string;
    nickname?: string;
    code?: string;
    city?: string;
    logo?: string;
};

export type ApiSportsGameStatus = {
    long?: string;
    short?: string;
    timer?: string | null;
};

export type ApiSportsGameScores = {
    points?: number | null;
};

export type ApiSportsGame = {
    id: number;
    date: {
        start: string;
        end?: string | null;
        duration?: string | null;
    };
    status: ApiSportsGameStatus;
    teams: {
        visitors: ApiSportsTeam;
        home: ApiSportsTeam;
    };
    scores: {
        visitors: ApiSportsGameScores;
        home: ApiSportsGameScores;
    };
};

export type ApiSportsGamesResponse = {
    get: string;
    parameters: Record<string, string>;
    errors: unknown[];
    results: number;
    response: ApiSportsGame[];
};