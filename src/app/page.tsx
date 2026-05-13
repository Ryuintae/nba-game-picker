import HomeHeader from "@/features/nba/components/home/HomeHeader";
import TodayGamesSection from "@/features/nba/components/home/TodayGamesSection";
import FeaturedGameSection from "@/features/nba/components/home/FeaturedGameSection";
import RankingTable from "@/features/nba/components/home/RankingTable";
import ScoringLeadersTable from "@/features/nba/components/home/ScoringLeadersTable";

import {
    getHeadToHeadSummary,
    getRecentGameResults,
} from "@/features/nba/api/espn/get-team-schedule-summary";
import { getPlayerLeaderCategories } from "@/features/nba/api/espn/get-scoring-leaders";
import { getTeamStandings } from "@/features/nba/api/espn/get-team-standings";
import { getTodayGamesWithArtwork } from "@/features/nba/api/get-today-games-with-artwork";
import { playerLeaderCategories } from "@/features/nba/data/home/scoring-leaders";
import { teamRankings } from "@/features/nba/data/home/team-rankings";

import type { GameListItem } from "@/features/nba/types/game";
import type {
    FeaturedGame,
    HomeGameCard,
    PlayerLeaderCategory,
    RecentGameResult,
    TeamRanking,
} from "@/features/nba/types/home";

type HomePageProps = {
    searchParams: Promise<{
        preview?: string | string[];
    }>;
};

const DEMO_PREVIEW_GAMES: HomeGameCard[] = [
    {
        id: "demo-preview-gsw-lal",
        time: "11:00",
        awayTeam: "Golden State Warriors",
        homeTeam: "Los Angeles Lakers",
        awayTeamAbbr: "GSW",
        homeTeamAbbr: "LAL",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
        score: 96,
    },
    {
        id: "demo-preview-bos-nyk",
        time: "09:30",
        awayTeam: "Boston Celtics",
        homeTeam: "New York Knicks",
        awayTeamAbbr: "BOS",
        homeTeamAbbr: "NYK",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/ny.png",
        score: 88,
    },
    {
        id: "demo-preview-den-phx",
        time: "10:00",
        awayTeam: "Denver Nuggets",
        homeTeam: "Phoenix Suns",
        awayTeamAbbr: "DEN",
        homeTeamAbbr: "PHX",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/den.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/phx.png",
        score: 84,
    },
    {
        id: "demo-preview-dal-lac",
        time: "11:30",
        awayTeam: "Dallas Mavericks",
        homeTeam: "LA Clippers",
        awayTeamAbbr: "DAL",
        homeTeamAbbr: "LAC",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/dal.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lac.png",
        score: 79,
    },
];

const DEMO_FEATURED_GAME: FeaturedGame = {
    id: "demo-preview-gsw-lal",
    time: "11:00",
    awayTeam: "Golden State Warriors",
    homeTeam: "Los Angeles Lakers",
    awayTeamAbbr: "GSW",
    homeTeamAbbr: "LAL",
    awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
    homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
    awayRecord: "48-34",
    homeRecord: "53-29",
    score: 96,
    streak: "데모 추천 경기",
    reason:
        "Golden State Warriors와 Los Angeles Lakers의 스타 파워와 공격 지표를 중심으로 구성한 데모 프리뷰 매치업입니다.",
    stats: {
        awayLast5: "7-3",
        homeLast5: "8-2",
        awayPpg: "114.8",
        homePpg: "118.2",
        awayOppPpg: "111.6",
        homeOppPpg: "109.7",
        awayWinRate: ".585",
        homeWinRate: ".646",
        headToHead: "최근 5전 LAL 3승 2패",
    },
    recentResults: {
        away: [
            { opponent: "PHX", result: "W", score: "118-112" },
            { opponent: "DEN", result: "L", score: "104-109" },
            { opponent: "SAC", result: "W", score: "121-113" },
        ],
        home: [
            { opponent: "LAC", result: "W", score: "116-108" },
            { opponent: "DAL", result: "W", score: "122-117" },
            { opponent: "OKC", result: "L", score: "109-114" },
        ],
    },
};

function isDemoPreview(preview: string | string[] | undefined) {
    return Array.isArray(preview)
        ? preview.includes("demo")
        : preview === "demo";
}

function getDemoPreviewGames() {
    return DEMO_PREVIEW_GAMES;
}

function mapGameListItemToHomeGameCard(game: GameListItem): HomeGameCard {
    return {
        id: game.id,
        time: game.startTime,
        awayTeam: game.awayTeam.displayName,
        homeTeam: game.homeTeam.displayName,
        awayTeamAbbr: game.awayTeam.abbreviation ?? game.awayTeam.displayName,
        homeTeamAbbr: game.homeTeam.abbreviation ?? game.homeTeam.displayName,
        awayLogoUrl: game.awayTeam.logoUrl,
        homeLogoUrl: game.homeTeam.logoUrl,
        score: game.matchupScore,
    };
}

function findTeamRanking(
    standings: TeamRanking[],
    teamName: string,
    abbreviation?: string
): TeamRanking | undefined {
    const normalizedTeamName = teamName.toLowerCase();
    const normalizedAbbreviation = abbreviation?.toLowerCase();

    return standings.find((team) => {
        return (
            team.team.toLowerCase() === normalizedTeamName ||
            team.abbreviation?.toLowerCase() === normalizedAbbreviation
        );
    });
}

function formatMatchupReason(
    awayRanking: TeamRanking | undefined,
    homeRanking: TeamRanking | undefined
): string {
    if (!awayRanking || !homeRanking) {
        return "현재 경기 정보와 Matchup Score를 기준으로 선정된 추천 경기입니다.";
    }

    return `${awayRanking.team}(${awayRanking.record})와 ${homeRanking.team}(${homeRanking.record})의 시즌 지표를 함께 비교해 선정한 추천 경기입니다.`;
}

function pickFeaturedGame(games: GameListItem[]): GameListItem | null {
    if (games.length === 0) {
        return null;
    }

    return games.reduce((bestGame, currentGame) => {
        return currentGame.matchupScore > bestGame.matchupScore
            ? currentGame
            : bestGame;
    });
}

async function getScheduleSummary(game: GameListItem): Promise<{
    headToHead: string;
    awayRecentResults: RecentGameResult[];
    homeRecentResults: RecentGameResult[];
}> {
    const [headToHead, awayRecentResults, homeRecentResults] =
        await Promise.all([
            getHeadToHeadSummary({
                teamAbbr: game.awayTeam.abbreviation,
                opponentAbbr: game.homeTeam.abbreviation,
                beforeDate: game.date,
            }),
            getRecentGameResults({
                teamAbbr: game.awayTeam.abbreviation,
                beforeDate: game.date,
            }),
            getRecentGameResults({
                teamAbbr: game.homeTeam.abbreviation,
                beforeDate: game.date,
            }),
        ]);

    return {
        headToHead,
        awayRecentResults,
        homeRecentResults,
    };
}

async function mapGameListItemToFeaturedGame(
    game: GameListItem,
    standings: TeamRanking[]
): Promise<FeaturedGame> {
    const awayRanking = findTeamRanking(
        standings,
        game.awayTeam.displayName,
        game.awayTeam.abbreviation
    );
    const homeRanking = findTeamRanking(
        standings,
        game.homeTeam.displayName,
        game.homeTeam.abbreviation
    );
    const { headToHead, awayRecentResults, homeRecentResults } =
        await getScheduleSummary(game).catch((error) => {
            console.error("[HomePage] failed to fetch schedule summary:", error);

            return {
                headToHead: "-",
                awayRecentResults: [],
                homeRecentResults: [],
            };
        });

    return {
        id: game.id,
        time: game.startTime,
        awayTeam: game.awayTeam.displayName,
        homeTeam: game.homeTeam.displayName,
        awayTeamAbbr: game.awayTeam.abbreviation ?? game.awayTeam.displayName,
        homeTeamAbbr: game.homeTeam.abbreviation ?? game.homeTeam.displayName,
        awayLogoUrl: game.awayTeam.logoUrl,
        homeLogoUrl: game.homeTeam.logoUrl,
        awayRecord: awayRanking?.record ?? game.awayTeam.record ?? "-",
        homeRecord: homeRanking?.record ?? game.homeTeam.record ?? "-",
        score: game.matchupScore,
        streak: "오늘의 추천 경기",
        reason: formatMatchupReason(awayRanking, homeRanking),
        stats: {
            awayLast5: awayRanking?.lastTen ?? "-",
            homeLast5: homeRanking?.lastTen ?? "-",
            awayPpg: awayRanking?.avgPointsFor ?? "-",
            homePpg: homeRanking?.avgPointsFor ?? "-",
            awayOppPpg: awayRanking?.avgPointsAgainst ?? "-",
            homeOppPpg: homeRanking?.avgPointsAgainst ?? "-",
            awayWinRate: awayRanking?.winRate ?? "-",
            homeWinRate: homeRanking?.winRate ?? "-",
            headToHead,
        },
        recentResults: {
            away: awayRecentResults,
            home: homeRecentResults,
        },
    };
}

async function getFeaturedGame(
    games: GameListItem[],
    standings: TeamRanking[]
): Promise<FeaturedGame | null> {
    const bestGame = pickFeaturedGame(games);

    if (!bestGame) {
        return null;
    }

    return mapGameListItemToFeaturedGame(bestGame, standings);
}

export default async function HomePage({ searchParams }: HomePageProps) {
    const resolvedSearchParams = await searchParams;
    const shouldShowDemoPreview = isDemoPreview(
        resolvedSearchParams.preview
    );
    let todayGames: GameListItem[] = [];
    let standings: TeamRanking[] = teamRankings;
    let leaderCategories: PlayerLeaderCategory[] = playerLeaderCategories;

    const [todayGamesResult, standingsResult, leadersResult] =
        await Promise.allSettled([
            getTodayGamesWithArtwork(),
            getTeamStandings(),
            getPlayerLeaderCategories(),
        ]);

    if (todayGamesResult.status === "fulfilled") {
        todayGames = todayGamesResult.value;
    } else {
        console.error(
            "[HomePage] failed to fetch today games:",
            todayGamesResult.reason
        );
    }

    if (standingsResult.status === "fulfilled") {
        standings = standingsResult.value;
    } else {
        console.error(
            "[HomePage] failed to fetch team standings:",
            standingsResult.reason
        );
    }

    if (leadersResult.status === "fulfilled") {
        leaderCategories = leadersResult.value;
    } else {
        console.error(
            "[HomePage] failed to fetch scoring leaders:",
            leadersResult.reason
        );
    }

    const realHomeGames = todayGames.map(mapGameListItemToHomeGameCard);
    const homeGames = shouldShowDemoPreview
        ? getDemoPreviewGames()
        : realHomeGames;
    const featuredGame = shouldShowDemoPreview
        ? DEMO_FEATURED_GAME
        : await getFeaturedGame(todayGames, standings);

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-[#f2f4f7] text-neutral-950 dark:bg-[#080b12] dark:text-white">
            <div className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.055]">
                <div className="absolute inset-0 [background-image:linear-gradient(90deg,rgba(29,66,138,0.9)_1px,transparent_1px),linear-gradient(rgba(249,115,22,0.7)_1px,transparent_1px)] [background-size:72px_72px] dark:[background-image:linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)]" />
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#1d428a] dark:bg-white" />
                <div className="absolute left-1/2 top-[170px] h-[460px] w-[460px] -translate-x-1/2 rounded-full border border-[#f97316] dark:border-white" />
            </div>
            <HomeHeader />

            <div className="relative w-full px-3 pb-6 pt-[128px] sm:px-4 lg:px-6 lg:pt-[96px]">
                <section id="today-games">
                    <TodayGamesSection games={homeGames} />
                </section>

                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.7fr)] xl:items-start">
                    <div id="featured-game" className="h-full">
                        {featuredGame ? (
                            <FeaturedGameSection game={featuredGame} />
                        ) : (
                            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white/60 p-8 text-center dark:border-white/10 dark:bg-white/5">
                                <h2 className="text-lg font-semibold">
                                    추천 경기가 없습니다
                                </h2>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    오늘 표시할 NBA 경기가 없어 추천 경기를 계산할 수 없습니다.
                                </p>
                            </div>
                        )}
                    </div>

                    <aside className="grid h-full gap-3">
                        <div id="leaders">
                            <ScoringLeadersTable categories={leaderCategories} />
                        </div>
                    </aside>
                </section>

                <section id="rankings" className="mt-6">
                    <RankingTable teams={standings} />
                </section>
            </div>
        </main>
    );
}
