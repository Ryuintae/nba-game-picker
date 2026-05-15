import Link from "next/link";

import GameCard from "@/features/nba/components/home/GameCard";
import type { HomeGameCard } from "@/features/nba/types/home";

type TodayGamesSectionProps = {
    games: HomeGameCard[];
};

export default function TodayGamesSection({ games }: TodayGamesSectionProps) {
    const hasGames = games.length > 0;

    return (
        <section className="mb-6 overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-[#10141b]">
            <div className="flex items-center justify-between border-b border-black/8 px-5 py-3 dark:border-white/10">
                <div>
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                        오늘 경기
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        한국 시간 기준 오늘 예정된 NBA 경기
                    </p>
                </div>

                <Link
                    href="/games"
                    className="text-[13px] font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                    전체 보기
                </Link>
            </div>

            {hasGames ? (
                <div className="flex gap-0 overflow-x-auto bg-black/[0.035] px-0 dark:bg-white/[0.035]">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <div className="bg-black/[0.025] px-5 py-4 dark:bg-white/[0.025]">
                    <p className="text-[13px] font-medium text-neutral-600 dark:text-neutral-300">
                        오늘 예정된 NBA 경기가 없습니다. 아래 추천 영역에서
                        데모 화면을 확인할 수 있습니다.
                    </p>
                </div>
            )}
        </section>
    );
}
