import type { TeamRanking } from "../../types/home";
import { TEAM_NAME_ALIASES } from "../../constants/team-brand";
import { getNbaTeamArtworkMap } from "../thesportsdb/get-nba-team-artwork-map";

const ESPN_NBA_STANDINGS_URL =
    "https://site.api.espn.com/apis/v2/sports/basketball/nba/standings";

export const DEFAULT_ESPN_NBA_STANDINGS_SEASON = 2026;

type EspnNbaConference = "east" | "west";

type EspnStandingStat = {
    name: string;
    value?: number;
    displayValue?: string;
};

type EspnStandingEntry = {
    team: {
        abbreviation?: string;
        displayName?: string;
        shortDisplayName?: string;
        logos?: Array<{
            href?: string;
        }>;
    };
    stats?: EspnStandingStat[];
};

type EspnStandingsResponse = {
    standings?: {
        entries?: EspnStandingEntry[];
    };
};

type GetTeamStandingsOptions = {
    season?: number;
};

const TEAM_CONFERENCE_BY_ABBR: Record<string, EspnNbaConference> = {
    ATL: "east",
    BOS: "east",
    BKN: "east",
    CHA: "east",
    CHI: "east",
    CLE: "east",
    DET: "east",
    IND: "east",
    MIA: "east",
    MIL: "east",
    NY: "east",
    NYK: "east",
    ORL: "east",
    PHI: "east",
    TOR: "east",
    WSH: "east",

    DAL: "west",
    DEN: "west",
    GS: "west",
    GSW: "west",
    HOU: "west",
    LAC: "west",
    LAL: "west",
    MEM: "west",
    MIN: "west",
    NO: "west",
    NOP: "west",
    OKC: "west",
    PHX: "west",
    POR: "west",
    SA: "west",
    SAS: "west",
    SAC: "west",
    UTAH: "west",
    UTA: "west",
};

function findStat(
    stats: EspnStandingStat[] | undefined,
    name: string
): EspnStandingStat | undefined {
    return stats?.find((stat) => stat.name === name);
}

function getStatNumber(
    stats: EspnStandingStat[] | undefined,
    name: string
): number {
    return findStat(stats, name)?.value ?? 0;
}

function getStatDisplayValue(
    stats: EspnStandingStat[] | undefined,
    name: string,
    fallback = "-"
): string {
    return findStat(stats, name)?.displayValue ?? fallback;
}

function getConference(entry: EspnStandingEntry): EspnNbaConference {
    const abbreviation = entry.team.abbreviation?.toUpperCase() ?? "";

    return TEAM_CONFERENCE_BY_ABBR[abbreviation] ?? "east";
}

function byConferenceRank(a: TeamRanking, b: TeamRanking): number {
    const winRateDiff = Number(b.winRate) - Number(a.winRate);

    if (winRateDiff !== 0) {
        return winRateDiff;
    }

    return (b.wins ?? 0) - (a.wins ?? 0);
}

function mapEntryToTeamRanking(entry: EspnStandingEntry): TeamRanking {
    const wins = getStatNumber(entry.stats, "wins");
    const losses = getStatNumber(entry.stats, "losses");
    const winRate = getStatDisplayValue(entry.stats, "winPercent");

    return {
        rank: 0,
        team:
            entry.team.displayName ??
            entry.team.shortDisplayName ??
            entry.team.abbreviation ??
            "Unknown Team",
        abbreviation: entry.team.abbreviation,
        conference: getConference(entry),
        record: `${wins}-${losses}`,
        winRate,
        wins,
        losses,
        lastTen: getStatDisplayValue(entry.stats, "Last Ten Games"),
        avgPointsFor: getStatDisplayValue(entry.stats, "avgPointsFor"),
        avgPointsAgainst: getStatDisplayValue(entry.stats, "avgPointsAgainst"),
        gamesBehind: getStatDisplayValue(entry.stats, "gamesBehind"),
        logoUrl: entry.team.logos?.[0]?.href ?? null,
    };
}

function getArtworkLookupKeys(team: TeamRanking): string[] {
    return [
        team.team.toLowerCase(),
        team.abbreviation?.toLowerCase(),
        TEAM_NAME_ALIASES[team.team.toLowerCase()],
        team.abbreviation
            ? TEAM_NAME_ALIASES[team.abbreviation.toLowerCase()]
            : undefined,
    ].filter((key): key is string => Boolean(key));
}

function withTheSportsDbArtwork(
    team: TeamRanking,
    artworkMap: Awaited<ReturnType<typeof getNbaTeamArtworkMap>>
): TeamRanking {
    const artwork = getArtworkLookupKeys(team)
        .map((key) => artworkMap[key])
        .find(Boolean);

    if (!artwork) {
        return team;
    }

    return {
        ...team,
        logoUrl: artwork.badgeUrl ?? artwork.logoUrl ?? team.logoUrl,
        fanartUrl: artwork.fanartUrl ?? team.fanartUrl,
    };
}

export async function getTeamStandings(
    options: GetTeamStandingsOptions = {}
): Promise<TeamRanking[]> {
    const params = new URLSearchParams({
        region: "us",
        lang: "en",
        contentorigin: "espn",
        type: "0",
        level: "1",
        sort: "winpercent:desc",
        season: String(options.season ?? DEFAULT_ESPN_NBA_STANDINGS_SEASON),
    });

    const response = await fetch(`${ESPN_NBA_STANDINGS_URL}?${params}`, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
        next: {
            revalidate: 60 * 60,
        },
    });

    if (!response.ok) {
        throw new Error(`ESPN standings request failed: ${response.status}`);
    }

    const [data, artworkMap] = await Promise.all([
        response.json() as Promise<EspnStandingsResponse>,
        getNbaTeamArtworkMap().catch((error) => {
            console.warn("[TheSportsDB] failed to fetch NBA team artwork:", error);

            return {};
        }),
    ]);
    const entries = data.standings?.entries ?? [];
    const rankedTeams = entries
        .map(mapEntryToTeamRanking)
        .map((team) => withTheSportsDbArtwork(team, artworkMap));

    return (["east", "west"] as const).flatMap((conference) =>
        rankedTeams
            .filter((team) => team.conference === conference)
            .sort(byConferenceRank)
            .map((team, index) => ({
                ...team,
                rank: index + 1,
            }))
    );
}
