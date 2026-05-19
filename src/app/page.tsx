import Link from "next/link";

import Image from "next/image";

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
import { waitForRouteLoadingAnimation } from "@/features/nba/lib/route-loading";

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

    const [fetchResults] = await Promise.all([
        Promise.allSettled([
            getTodayGamesWithArtwork(),
            getTeamStandings(),
            getPlayerLeaderCategories(),
        ]),
        waitForRouteLoadingAnimation(),
    ]);

    const [todayGamesResult, standingsResult, leadersResult] = fetchResults;

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
                {shouldShowDemoPreview ? (
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border border-black/10 bg-white px-5 py-3 dark:border-white/10 dark:bg-[#10141b]">
                        <div>
                            <p className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                                데모 화면을 보고 있습니다.
                            </p>
                            <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                                실제 일정이 없는 날의 홈 화면 구성을 미리 보여주는 모드입니다.
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center border border-black/10 px-4 py-2 text-[13px] font-semibold text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                            실제 화면으로 돌아가기
                        </Link>
                    </div>
                ) : null}

                <section id="today-games">
                    <TodayGamesSection games={homeGames} />
                </section>

                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.7fr)] xl:items-start">
                    <div id="featured-game" className="h-full">
                        {featuredGame ? (
                            <FeaturedGameSection game={featuredGame} />
                        ) : (
                            <div className="h-full overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-[#10141b]">
                                <div className="border-b border-black/8 px-5 py-3 dark:border-white/10">
                                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">오늘의 추천 경기</p>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">경기 없는 날에는 데모 화면으로 홈 구성을 확인해보세요</p>
                                </div>

                                <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
                                    <div className="p-5 sm:p-6">
                                        <p className="text-[24px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">오늘 예정된 NBA 경기가 없습니다.</p>
                                        <p className="mt-3 max-w-2xl text-[14px] leading-7 text-neutral-600 dark:text-neutral-300">경기가 없는 날에는 실제 일정 대신 데모 화면으로 홈 구성을 미리 볼 수 있습니다. 아래 예시 매치업을 눌러 전체 홈 데모를 확인해보세요.</p>

                                        <div className="mt-6 overflow-hidden border border-black/8 bg-[#f8f9fb] dark:border-white/10 dark:bg-white/[0.04]">
                                            <div className="relative min-h-[260px] overflow-hidden p-5 sm:p-6">
                                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(29,66,138,0.10),transparent_42%),linear-gradient(315deg,rgba(85,37,131,0.16),transparent_48%)] dark:bg-[linear-gradient(135deg,rgba(29,66,138,0.26),transparent_42%),linear-gradient(315deg,rgba(85,37,131,0.30),transparent_48%)]" />
                                                <div className="absolute inset-x-6 top-6 bottom-6 border-2 border-white/70 dark:border-white/10" />
                                                <div className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-white/70 dark:bg-white/10" />
                                                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 dark:border-white/10" />

                                                <div className="relative flex items-center justify-between gap-5">
                                                    <div className="min-w-0">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">Demo Matchup</p>
                                                        <h3 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.06em] text-neutral-950 dark:text-white">Warriors<br />Lakers</h3>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative h-20 w-20 shrink-0">
                                                            <Image
                                                                src="https://a.espncdn.com/i/teamlogos/nba/500/gs.png"
                                                                alt="Golden State Warriors logo"
                                                                width={80}
                                                                height={80}
                                                                className="h-full w-full object-contain"
                                                            />
                                                        </div>
                                                        <span className="text-[12px] font-semibold text-neutral-400 dark:text-neutral-500">VS</span>
                                                        <div className="relative h-20 w-20 shrink-0">
                                                            <Image
                                                                src="https://a.espncdn.com/i/teamlogos/nba/500/lal.png"
                                                                alt="Los Angeles Lakers logo"
                                                                width={80}
                                                                height={80}
                                                                className="h-full w-full object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                                                    <div className="bg-white/80 p-3 backdrop-blur-sm dark:bg-black/25"><p className="text-[10px] font-semibold uppercase text-neutral-500 dark:text-neutral-400">Main Card</p><p className="mt-1 text-[13px] font-semibold text-neutral-950 dark:text-white">추천 경기</p></div>
                                                    <div className="bg-white/80 p-3 backdrop-blur-sm dark:bg-black/25"><p className="text-[10px] font-semibold uppercase text-neutral-500 dark:text-neutral-400">Leaders</p><p className="mt-1 text-[13px] font-semibold text-neutral-950 dark:text-white">선수 리더</p></div>
                                                    <div className="bg-white/80 p-3 backdrop-blur-sm dark:bg-black/25"><p className="text-[10px] font-semibold uppercase text-neutral-500 dark:text-neutral-400">Tables</p><p className="mt-1 text-[13px] font-semibold text-neutral-950 dark:text-white">팀 순위</p></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            <Link href="/?preview=demo" className="inline-flex items-center justify-center bg-neutral-950 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">데모 화면 보기</Link>
                                            <Link href="/games" className="inline-flex items-center justify-center border border-black/10 px-4 py-2.5 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5">전체 경기 일정 보기</Link>
                                        </div>
                                    </div>
                                    <div className="border-t border-black/8 bg-[#f8f9fb] p-5 dark:border-white/10 dark:bg-white/[0.04] lg:border-l lg:border-t-0">
                                        <div className="flex items-center justify-between gap-3"><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">Demo Preview</p><span className="border border-black/10 px-2 py-1 text-[10px] font-semibold text-neutral-500 dark:border-white/10 dark:text-neutral-400">예시</span></div>
                                        <div className="mt-4 space-y-2">
                                            {[["11:00", "GSW", "LAL", "96"], ["09:30", "BOS", "NYK", "88"], ["10:00", "DEN", "PHX", "84"]].map(([time, away, home, score]) => (
                                                <div key={`${away}-${home}`} className="grid grid-cols-[52px_1fr_auto] items-center gap-3 border border-black/8 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-[#151a22]"><span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{time}</span><div className="min-w-0"><p className="truncate text-[13px] font-semibold text-neutral-950 dark:text-white">{away} at {home}</p><p className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">Matchup Score</p></div><span className="text-[14px] font-semibold tabular-nums text-neutral-950 dark:text-white">{score}</span></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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



