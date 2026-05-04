import { theSportsDbFetch } from "./client";
import type {
    TheSportsDbTeam,
    TheSportsDbTeamsResponse,
} from "../../types/thesportsdb";

export async function getTeamArtworkById(
    teamId: string
): Promise<TheSportsDbTeam | null> {
    if (!teamId) return null;

    const data = await theSportsDbFetch<TheSportsDbTeamsResponse>(
        `/lookupteam.php?id=${teamId}`,
        {
            revalidate: 60 * 60 * 24,
        }
    );

    const team = data.teams?.[0] ?? null;

    if (!team) return null;

    if (team.strSport !== "Basketball" || team.strLeague !== "NBA") {
        console.warn("[TheSportsDB] invalid team response:", {
            teamId,
            strTeam: team.strTeam,
            strSport: team.strSport,
            strLeague: team.strLeague,
        });

        return null;
    }

    return team;
}