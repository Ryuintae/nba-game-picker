import type { FeaturedGame } from "@/features/nba/types/home";

type RecentResultsProps = {
    game: FeaturedGame;
};

export default function RecentResults({ game }: RecentResultsProps) {
    return (
        <div className="mt-4 rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        최근 경기 결과
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        최근 흐름 빠르게 확인
                    </p>
                </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[16px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {game.awayTeam} 최근 3경기
                    </p>
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-700 dark:text-neutral-200">vs Suns</span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                W 121-114
              </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-700 dark:text-neutral-200">vs Rockets</span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                W 118-110
              </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-700 dark:text-neutral-200">vs Kings</span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                L 112-117
              </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-[16px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {game.homeTeam} 최근 3경기
                    </p>
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-700 dark:text-neutral-200">vs Nuggets</span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                L 109-113
              </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-700 dark:text-neutral-200">vs Mavericks</span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                W 122-116
              </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-neutral-700 dark:text-neutral-200">vs Clippers</span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                W 119-108
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}