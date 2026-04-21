import Link from "next/link";
import { getScoreTone } from "@/features/nba/lib/score";
import type { HomeGameCard } from "@/features/nba/types/home";

type GamesListProps = {
    games: HomeGameCard[];
};

export default function GamesList({ games }: GamesListProps) {
    return (
        <section className="rounded-[24px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111214]">
            <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10 sm:px-5">
                <div>
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                        전체 경기 목록
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        오늘 경기들을 추천 점수 기준으로 확인
                    </p>
                </div>
            </div>

            <div className="divide-y divide-black/6 dark:divide-white/10">
                {games.map((game) => (
                    <Link
                        key={game.id}
                        href={`/games/${game.id}`}
                        className="block px-4 py-4 transition hover:bg-[#f8f9fb] dark:hover:bg-[#17191d] sm:px-5"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                    {game.time}
                                </p>

                                <h3 className="mt-1 truncate text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                                    {game.awayTeam} vs {game.homeTeam}
                                </h3>
                            </div>

                            <span
                                className={`shrink-0 inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold ${getScoreTone(
                                    game.score
                                )}`}
                            >
                {game.score}
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}