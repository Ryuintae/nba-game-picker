import Link from "next/link";
import GameCard from "@/features/nba/components/home/GameCard";
import type { HomeGameCard } from "@/features/nba/types/home";

type TodayGamesSectionProps = {
    games: HomeGameCard[];
};

export default function TodayGamesSection({
                                              games,
                                          }: TodayGamesSectionProps) {
    return (
        <section className="mb-6 overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-[#10141b]">
            <div className="flex items-center justify-between border-b border-black/8 px-5 py-3 dark:border-white/10">
                <div>
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                        오늘 경기
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        추천 점수를 기준으로 빠르게 비교
                    </p>
                </div>

                <Link
                    href="/games"
                    className="text-[13px] font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                    전체 보기
                </Link>
            </div>

            <div className="flex gap-0 overflow-x-auto bg-black/[0.035] px-0 dark:bg-white/[0.035]">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </section>
    );
}
