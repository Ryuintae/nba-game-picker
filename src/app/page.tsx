import HomeHeader from "@/features/nba/components/home/HomeHeader";
import TodayGamesSection from "@/features/nba/components/home/TodayGamesSection";
import FeaturedGameSection from "@/features/nba/components/home/FeaturedGameSection";
import RankingTable from "@/features/nba/components/home/RankingTable";
import ScoringLeadersTable from "@/features/nba/components/home/ScoringLeadersTable";

import { featuredGame } from "@/features/nba/data/home/featured-game";
import { games } from "@/features/nba/data/home/games";
import { scoringLeaders } from "@/features/nba/data/home/scoring-leaders";
import { teamRankings } from "@/features/nba/data/home/team-rankings";

export default function HomePage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f7f3ea] text-neutral-950 dark:bg-[#0b0f17] dark:text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.07),transparent_26%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.06),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(251,146,60,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.08),transparent_28%)]" />
            </div>

            <HomeHeader />

            <div className="relative mx-auto w-full max-w-[1800px] px-3 pb-6 pt-3 sm:px-4 lg:px-6">
                <section id="today-games">
                    <TodayGamesSection games={games} />
                </section>

                <section className="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
                    <div id="featured-game">
                        <FeaturedGameSection game={featuredGame} />
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