export type GameStatus = "scheduled" | "live" | "final" | "postponed";

export type GameTeam = {
    id: number;
    name: string;
    displayName: string;
    abbreviation?: string;
    city?: string;
    score?: number | null;
    logoUrl?: string | null;
};

export type GameListItem = {
    id: string;
    apiId: number;
    date: string;
    startTime: string;
    status: GameStatus;
    statusText: string;
    homeTeam: GameTeam;
    awayTeam: GameTeam;
    matchupScore: number;
    summary: string;
};