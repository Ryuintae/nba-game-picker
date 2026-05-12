import type { FeaturedGame, RecentGameResult } from "@/features/nba/types/home";

type RecentResultsProps = {
    game: FeaturedGame;
};

type RecentResultListProps = {
    teamName: string;
    results: RecentGameResult[];
};

function RecentResultList({ teamName, results }: RecentResultListProps) {
    return (
        <div className="rounded-[16px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {teamName} 최근 3경기
            </p>
            <div className="mt-3 space-y-2">
                {results.length > 0 ? (
                    results.map((result) => (
                        <div
                            key={`${teamName}-${result.opponent}-${result.score}`}
                            className="flex items-center justify-between text-[13px]"
                        >
                            <span className="text-neutral-700 dark:text-neutral-200">
                                vs {result.opponent}
                            </span>
                            <span className="font-semibold text-neutral-950 dark:text-white">
                                {result.result} {result.score}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                        최근 경기 결과가 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function RecentResults({ game }: RecentResultsProps) {
    return (
        <div className="mt-4 rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        최근 경기 결과
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        ESPN 일정 기준 최근 흐름
                    </p>
                </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
                <RecentResultList
                    teamName={game.awayTeam}
                    results={game.recentResults.away}
                />
                <RecentResultList
                    teamName={game.homeTeam}
                    results={game.recentResults.home}
                />
            </div>
        </div>
    );
}
