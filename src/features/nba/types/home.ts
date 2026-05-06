export type TeamBrand = {
    primary: string;
    secondary: string;
    surface: string;
    ring: string;
};

export type HomeGameCard = {
    id: string;
    time: string;
    awayTeam: string;
    homeTeam: string;
    awayTeamAbbr: string;
    homeTeamAbbr: string;
    score: number;
};

export type FeaturedGameStats = {
    awayLast5: string;
    homeLast5: string;
    awayPpg: string;
    homePpg: string;
    awayOppPpg: string;
    homeOppPpg: string;
    awayWinRate: string;
    homeWinRate: string;
    headToHead: string;
};

export type FeaturedGame = {
    id: string;
    time: string;
    awayTeam: string;
    homeTeam: string;
    awayTeamAbbr: string;
    homeTeamAbbr: string;
    awayRecord: string;
    homeRecord: string;
    score: number;
    streak: string;
    reason: string;
    stats: FeaturedGameStats;
};

export type TeamRanking = {
    rank: number;
    team: string;
    record: string;
    winRate: string;
};

export type ScoringLeader = {
    rank: number;
    name: string;
    team: string;
    ppg: number;
};