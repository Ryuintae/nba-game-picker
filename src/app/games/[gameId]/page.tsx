import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import HomeHeader from "@/features/nba/components/home/HomeHeader";
import { getEspnGameSummary } from "@/features/nba/api/espn/get-game-summary";
import { gameDetailMap } from "@/features/nba/data/games/game-detail";
import { getScoreTone } from "@/features/nba/lib/score";
import type { FeaturedGame } from "@/features/nba/types/home";
import type { GameTeam } from "@/features/nba/types/game";

type GameDetailPageProps = {
    params: Promise<{
        gameId: string;
    }>;
};

type DetailGame = {
    id: string;
    time: string;
    statusText: string;
    awayTeam: GameTeam;
    homeTeam: GameTeam;
    matchupScore: number;
    reason: string;
    note?: string;
    venue?: string;
    broadcasts: string[];
    stats: {
        awayLastTen: string;
        homeLastTen: string;
        awayPpg: string;
        homePpg: string;
        awayOppPpg: string;
        homeOppPpg: string;
    };
};

function toTeamFromFeaturedGame(
    game: FeaturedGame,
    side: "away" | "home"
): GameTeam {
    const isAway = side === "away";

    return {
        id: 0,
        name: isAway ? game.awayTeam : game.homeTeam,
        displayName: isAway ? game.awayTeam : game.homeTeam,
        abbreviation: isAway ? game.awayTeamAbbr : game.homeTeamAbbr,
        record: isAway ? game.awayRecord : game.homeRecord,
        logoUrl: isAway ? game.awayLogoUrl : game.homeLogoUrl,
    };
}

function mapFeaturedGameToDetailGame(game: FeaturedGame): DetailGame {
    return {
        id: game.id,
        time: game.time,
        statusText: "추천 경기",
        awayTeam: toTeamFromFeaturedGame(game, "away"),
        homeTeam: toTeamFromFeaturedGame(game, "home"),
        matchupScore: game.score,
        reason: game.reason,
        broadcasts: [],
        stats: {
            awayLastTen: game.stats.awayLast5,
            homeLastTen: game.stats.homeLast5,
            awayPpg: game.stats.awayPpg,
            homePpg: game.stats.homePpg,
            awayOppPpg: game.stats.awayOppPpg,
            homeOppPpg: game.stats.homeOppPpg,
        },
    };
}

async function getGameDetail(gameId: string): Promise<DetailGame | null> {
    if (gameId.startsWith("espn-")) {
        const espnGame = await getEspnGameSummary(gameId);

        if (espnGame) {
            return {
                id: espnGame.id,
                time: espnGame.time,
                statusText: espnGame.statusText,
                awayTeam: espnGame.awayTeam,
                homeTeam: espnGame.homeTeam,
                matchupScore: espnGame.matchupScore,
                reason:
                    "ESPN 경기 데이터와 팀 시즌 지표를 바탕으로 상세 정보를 구성했습니다.",
                note: espnGame.note,
                venue: espnGame.venue,
                broadcasts: espnGame.broadcasts,
                stats: espnGame.stats,
            };
        }
    }

    const fallbackGame = gameDetailMap[gameId];

    return fallbackGame ? mapFeaturedGameToDetailGame(fallbackGame) : null;
}

function TeamBlock({
    label,
    team,
    align = "left",
}: {
    label: string;
    team: GameTeam;
    align?: "left" | "right";
}) {
    return (
        <div className={align === "right" ? "text-right" : ""}>
            <p className="text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
                {label}
            </p>
            <div
                className={`mt-3 flex items-center gap-3 ${
                    align === "right" ? "justify-end" : ""
                }`}
            >
                {team.logoUrl ? (
                    <div className="relative h-12 w-12 shrink-0">
                        <Image
                            src={team.logoUrl}
                            alt={`${team.displayName} logo`}
                            fill
                            sizes="48px"
                            className="object-contain"
                        />
                    </div>
                ) : null}
                <div className="min-w-0">
                    <h2 className="truncate text-[26px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                        {team.displayName}
                    </h2>
                    <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                        {team.abbreviation ?? "NBA"} · {team.record ?? "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}

function StatCompare({
    label,
    awayValue,
    homeValue,
    awayTeam,
    homeTeam,
}: {
    label: string;
    awayValue: string;
    homeValue: string;
    awayTeam: GameTeam;
    homeTeam: GameTeam;
}) {
    return (
        <div className="border border-black/8 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                {label}
            </p>
            <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="truncate text-neutral-600 dark:text-neutral-300">
                        {awayTeam.abbreviation ?? awayTeam.displayName}
                    </span>
                    <strong className="text-neutral-950 dark:text-white">
                        {awayValue}
                    </strong>
                </div>
                <div className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="truncate text-neutral-600 dark:text-neutral-300">
                        {homeTeam.abbreviation ?? homeTeam.displayName}
                    </span>
                    <strong className="text-neutral-950 dark:text-white">
                        {homeValue}
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
    const { gameId } = await params;
    const game = await getGameDetail(gameId);

    if (!game) {
        notFound();
    }

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-[#f2f4f7] text-neutral-950 dark:bg-[#080b12] dark:text-white">
            <div className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.055]">
                <div className="absolute inset-0 [background-image:linear-gradient(90deg,rgba(29,66,138,0.9)_1px,transparent_1px),linear-gradient(rgba(249,115,22,0.7)_1px,transparent_1px)] [background-size:72px_72px] dark:[background-image:linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)]" />
            </div>
            <HomeHeader />

            <div className="relative w-full px-3 pb-6 pt-[128px] sm:px-4 lg:px-6 lg:pt-[96px]">
                <section className="overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-[#10141b]">
                    <div className="border-b border-black/8 px-5 py-4 dark:border-white/10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                                    Game Detail
                                </p>
                                <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">
                                    {game.time} KST · {game.statusText}
                                </p>
                            </div>
                            <Link
                                href="/games"
                                className="inline-flex items-center justify-center border border-black/10 px-4 py-2 text-[13px] font-semibold text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                            >
                                경기 목록
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
                        <div className="p-5 sm:p-6">
                            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
                                <TeamBlock label="Away" team={game.awayTeam} />
                                <div className="flex items-center justify-center">
                                    <span className="text-[13px] font-semibold text-neutral-400">
                                        VS
                                    </span>
                                </div>
                                <TeamBlock
                                    label="Home"
                                    team={game.homeTeam}
                                    align="right"
                                />
                            </div>

                            <p className="mt-6 max-w-3xl text-[14px] leading-7 text-neutral-600 dark:text-neutral-300">
                                {game.reason}
                            </p>

                            <div className="mt-6 grid gap-3 md:grid-cols-3">
                                <StatCompare
                                    label="최근 흐름"
                                    awayValue={game.stats.awayLastTen}
                                    homeValue={game.stats.homeLastTen}
                                    awayTeam={game.awayTeam}
                                    homeTeam={game.homeTeam}
                                />
                                <StatCompare
                                    label="평균 득점"
                                    awayValue={game.stats.awayPpg}
                                    homeValue={game.stats.homePpg}
                                    awayTeam={game.awayTeam}
                                    homeTeam={game.homeTeam}
                                />
                                <StatCompare
                                    label="평균 실점"
                                    awayValue={game.stats.awayOppPpg}
                                    homeValue={game.stats.homeOppPpg}
                                    awayTeam={game.awayTeam}
                                    homeTeam={game.homeTeam}
                                />
                            </div>
                        </div>

                        <aside className="border-t border-black/8 bg-[#f8f9fb] p-5 dark:border-white/10 dark:bg-white/[0.04] lg:border-l lg:border-t-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                                Matchup Score
                            </p>
                            <p
                                className={`mt-3 text-[56px] font-semibold leading-none tracking-[-0.08em] ${getScoreTone(
                                    game.matchupScore
                                )}`}
                            >
                                {game.matchupScore}
                            </p>
                            <p className="mt-3 text-[12px] leading-5 text-neutral-500 dark:text-neutral-400">
                                실시간 점수와 경기 상태를 기준으로 추천 우선순위를
                                계산합니다.
                            </p>

                            <div className="mt-6 space-y-3 border-t border-black/8 pt-4 text-[13px] dark:border-white/10">
                                <div>
                                    <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                                        경기장
                                    </p>
                                    <p className="mt-1 text-neutral-950 dark:text-white">
                                        {game.venue ?? "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                                        중계
                                    </p>
                                    <p className="mt-1 text-neutral-950 dark:text-white">
                                        {game.broadcasts.length > 0
                                            ? game.broadcasts.join(", ")
                                            : "-"}
                                    </p>
                                </div>
                                {game.note ? (
                                    <div>
                                        <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                                            비고
                                        </p>
                                        <p className="mt-1 text-neutral-950 dark:text-white">
                                            {game.note}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        </main>
    );
}
