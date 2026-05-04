export type TheSportsDbTeam = {
    idTeam: string;
    idLeague?: string | null;
    strTeam: string;
    strTeamAlternate?: string | null;
    strTeamShort?: string | null;
    strSport?: string | null;
    strLeague?: string | null;
    strBadge?: string | null;
    strLogo?: string | null;
    strBanner?: string | null;
    strFanart1?: string | null;
    strFanart2?: string | null;
    strFanart3?: string | null;
    strFanart4?: string | null;
};

export type TheSportsDbTeamsResponse = {
    teams: TheSportsDbTeam[] | null;
};