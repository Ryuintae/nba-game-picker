import { getScoreTone } from "@/features/nba/lib/score";
import FeaturedGameCard from "@/features/nba/components/home/FeaturedGameCard";
import MatchupPanel from "@/features/nba/components/home/MatchupPanel";
import RecentResults from "@/features/nba/components/home/RecentResults";
import type { FeaturedGame } from "@/features/nba/types/home";

type FeaturedGameSectionProps = {
    game: FeaturedGame;
};

export default function FeaturedGameSection({
                                                game,
                                            }: FeaturedGameSectionProps) {
    return (
        <section className="rounded-[24px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111214]">
            <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10 sm:px-5">
                <div>
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                        오늘의 추천 경기
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        가장 먼저 볼 만한 경기
                    </p>
                </div>

                <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold ${getScoreTone(
                        game.score
                    )}`}
                >
          {game.score}점
        </span>
            </div>

            <div className="p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
                    <FeaturedGameCard game={game} />
                    <MatchupPanel game={game} />
                </div>

                <RecentResults game={game} />
            </div>
        </section>
    );
}