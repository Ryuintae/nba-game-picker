import HomeHeader from "@/features/nba/components/home/HomeHeader";
import TodayGamesSection from "@/features/nba/components/home/TodayGamesSection";
import FeaturedGameSection from "@/features/nba/components/home/FeaturedGameSection";
import RankingTable from "@/features/nba/components/home/RankingTable";
import ScoringLeadersTable from "@/features/nba/components/home/ScoringLeadersTable";

import { getTodayGamesWithArtwork } from "@/features/nba/api/get-today-games-with-artwork";
import { scoringLeaders } from "@/features/nba/data/home/scoring-leaders";
import { teamRankings } from "@/features/nba/data/home/team-rankings";

import type { GameListItem } from "@/features/nba/types/game";
import type { FeaturedGame, HomeGameCard } from "@/features/nba/types/home";

function mapGameListItemToHomeGameCard(game: GameListItem): HomeGameCard {

    return {
        id: game.id,
        time: game.startTime,
        awayTeam: game.awayTeam.displayName,
        homeTeam: game.homeTeam.displayName,
        awayTeamAbbr: game.awayTeam.abbreviation ?? game.awayTeam.displayName,
        homeTeamAbbr: game.homeTeam.abbreviation ?? game.homeTeam.displayName,
        score: game.matchupScore,
    };
}

function mapGameListItemToFeaturedGame(game: GameListItem): FeaturedGame {
    return {
        id: game.id,
        time: game.startTime,
        awayTeam: game.awayTeam.displayName,
        homeTeam: game.homeTeam.displayName,
        awayTeamAbbr: game.awayTeam.abbreviation ?? game.awayTeam.displayName,
        homeTeamAbbr: game.homeTeam.abbreviation ?? game.homeTeam.displayName,
        awayRecord: "-",
        homeRecord: "-",
        score: game.matchupScore,
        streak: "오늘의 추천 경기",
        reason: "현재 경기 정보와 Matchup Score를 기준으로 선정된 추천 경기입니다.",
        stats: {
            awayLast5: "-",
            homeLast5: "-",
            awayPpg: "-",
            homePpg: "-",
            awayOppPpg: "-",
            homeOppPpg: "-",
            awayWinRate: "-",
            homeWinRate: "-",
            headToHead: "-",
        },
    };
}
function getFeaturedGame(games: GameListItem[]): FeaturedGame | null {
    if (games.length === 0) {
        return null;
    }

    const bestGame = games.reduce((bestGame, currentGame) => {
        return currentGame.matchupScore > bestGame.matchupScore
            ? currentGame
            : bestGame;
    });

    return mapGameListItemToFeaturedGame(bestGame);
}

export default async function HomePage() {
    let todayGames: GameListItem[] = [];

    try {
        todayGames = await getTodayGamesWithArtwork();
    } catch (error) {
        console.error("[HomePage] failed to fetch today games:", error);
    }

    const homeGames = todayGames.map(mapGameListItemToHomeGameCard);
    const featuredGame = getFeaturedGame(todayGames);
    console.log("[HomePage] todayGames:", todayGames);
    console.log("[HomePage] featuredGame:", featuredGame);
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f7f3ea] text-neutral-950 dark:bg-[#0b0f17] dark:text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.07),transparent_26%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.06),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(251,146,60,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.08),transparent_28%)]" />
            </div>

            <HomeHeader />

            <div className="relative mx-auto w-full max-w-[1800px] px-3 pb-6 pt-3 sm:px-4 lg:px-6">
                <section id="today-games">
                    <TodayGamesSection games={homeGames} />
                </section>

                <section className="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
                    <div id="featured-game">
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

                    <div className="grid gap-3">
                        <div id="rankings">
                            <RankingTable teams={teamRankings} />
                        </div>

                        <div id="leaders">
                            <ScoringLeadersTable players={scoringLeaders} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}