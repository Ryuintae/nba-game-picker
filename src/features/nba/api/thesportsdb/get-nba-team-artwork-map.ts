import { TEAM_NAME_ALIASES } from "../../constants/team-brand";
import type { TheSportsDbTeam, TheSportsDbTeamsResponse } from "../../types/thesportsdb";
import { theSportsDbFetch } from "./client";

type TeamArtwork = {
    badgeUrl: string | null;
    logoUrl: string | null;
    fanartUrl: string | null;
};

function getTeamLookupKeys(team: TheSportsDbTeam): string[] {
    return [
        team.strTeam,
        team.strTeamShort,
        team.strTeamAlternate,
    ].flatMap((name) => {
        if (!name) return [];

        const normalizedName = name.toLowerCase();
        const alias = TEAM_NAME_ALIASES[normalizedName];

        return alias ? [normalizedName, alias] : [normalizedName];
    });
}

export async function getNbaTeamArtworkMap(): Promise<Record<string, TeamArtwork>> {
    const data = await theSportsDbFetch<TheSportsDbTeamsResponse>(
        "/search_all_teams.php?l=NBA",
        {
            revalidate: 60 * 60 * 24,
        }
    );
    const teams = data.teams ?? [];

    return teams.reduce<Record<string, TeamArtwork>>((artworkMap, team) => {
        const artwork = {
            badgeUrl: team.strBadge ?? null,
            logoUrl: team.strLogo ?? null,
            fanartUrl:
                team.strFanart1 ??
                team.strFanart2 ??
                team.strFanart3 ??
                team.strFanart4 ??
                null,
        };

        getTeamLookupKeys(team).forEach((key) => {
            artworkMap[key] = artwork;
        });

        return artworkMap;
    }, {});
}
