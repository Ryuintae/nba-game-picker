import { THESPORTSDB_TEAM_ID_BY_ABBR } from "../../constants/thesportsdb-team-id";
import { getTeamArtworkById } from "./get-team-artwork-by-id";

export async function getTeamArtworkByAbbr(abbreviation?: string) {
    if (!abbreviation) return null;

    const teamId = THESPORTSDB_TEAM_ID_BY_ABBR[abbreviation];

    if (!teamId) {
        return null;
    }

    try {
        return await getTeamArtworkById(teamId);
    } catch (error) {
        console.warn("[TheSportsDB] failed to fetch team artwork:", {
            abbreviation,
            teamId,
            error,
        });

        return null;
    }
}