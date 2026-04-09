export interface FeaturedGameStats {
    headToHead: string;
    awayLast5: string;
    homeLast5: string;
    awayPpg: string;
    homePpg: string;
    awayOppPpg: string;
    homeOppPpg: string;
    awayWinRate: string;
    homeWinRate: string;
}

export interface FeaturedGame {
    id: string;
    awayTeam: string;
    homeTeam: string;
    time: string;
    score: number;
    reason: string;
    awayRecord: string;
    homeRecord: string;
    streak: string;
    stats: FeaturedGameStats;
}

export interface HomeGameItem {
    id: string;
    awayTeam: string;
    homeTeam: string;
    time: string;
    score: number;
}

export interface TeamRankingItem {
    rank: number;
    team: string;
    record: string;
    winRate: string;
}

export interface ScoringLeaderItem {
    rank: number;
    name: string;
    team: string;
    ppg: number;
}

export interface TeamBrand {
    primary: string;
    secondary: string;
    surface: string;
    ring: string;
}