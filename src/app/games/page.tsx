import Link from "next/link";
import GamesList from "@/features/nba/components/games/GamesList";
import { games } from "@/features/nba/data/home/games";

export default function GamesPage() {
    const sortedGames = [...games].sort((a, b) => b.score - a.score);

    return (
        <main className="min-h-screen bg-[#f3f4f6] text-neutral-950 dark:bg-[#0b0c0f] dark:text-white">
            <div className="mx-auto w-full max-w-[1200px] px-3 pb-6 pt-3 sm:px-4 lg:px-5">
                <header className="mb-3 rounded-[22px] border border-black/6 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#111214] sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                Games
                            </p>
                            <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                                추천 점수가 높은 경기부터 빠르게 확인할 수 있습니다.
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                            홈으로
                        </Link>
                    </div>
                </header>

                <GamesList games={sortedGames} />
            </div>
        </main>
    );
}