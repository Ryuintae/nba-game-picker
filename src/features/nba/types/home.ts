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

export type RecentGameResult = {
    opponent: string;
    result: "W" | "L";
    score: string;
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
    recentResults: {
        away: RecentGameResult[];
        home: RecentGameResult[];
    };
};

export type TeamRanking = {
    rank: number;
    team: string;
    abbreviation?: string;
    conference?: "east" | "west";
    record: string;
    winRate: string;
    wins?: number;
    losses?: number;
    lastTen?: string;
    avgPointsFor?: string;
    avgPointsAgainst?: string;
    gamesBehind?: string;
    logoUrl?: string | null;
    fanartUrl?: string | null;
};

export type ScoringLeader = {
    rank: number;
    name: string;
    team: string;
    position?: string;
    gamesPlayed?: number;
    leaderValue?: number;
    ppg: number;
    apg?: number;
    rpg?: number;
    threePointersMade?: number;
    headshotUrl?: string | null;
    teamLogoUrl?: string | null;
};

export type PlayerLeaderCategory = {
    key: "scoring" | "assists" | "threePointers";
    label: string;
    statLabel: "PPG" | "APG" | "3PM";
    players: ScoringLeader[];
};
