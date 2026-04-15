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
      <main className="min-h-screen bg-[#f3f4f6] text-neutral-950 dark:bg-[#0b0c0f] dark:text-white">
        <div className="mx-auto w-full max-w-[1600px] px-3 pb-6 pt-3 sm:px-4 lg:px-5">
          <HomeHeader />

          <TodayGamesSection games={games} />

          <section className="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
            <FeaturedGameSection game={featuredGame} />

            <div className="grid gap-3">
              <RankingTable teams={teamRankings} />
              <ScoringLeadersTable players={scoringLeaders} />
            </div>
          </section>
        </div>
      </main>
  );
}