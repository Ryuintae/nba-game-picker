import type { FeaturedGame, RecentGameResult } from "@/features/nba/types/home";

type RecentResultsProps = {
    game: FeaturedGame;
};

type RecentResultListProps = {
    teamName: string;
    results: RecentGameResult[];
};

function parseScore(score: string) {
    const [teamScore, opponentScore] = score.split("-");

    return {
        teamScore: teamScore?.trim() || "-",
        opponentScore: opponentScore?.trim() || "-",
    };
}

function getRecord(results: RecentGameResult[]) {
    const wins = results.filter((result) => result.result === "W").length;
    const losses = results.length - wins;

    return `${wins}-${losses}`;
}

function RecentResultRow({ result }: { result: RecentGameResult }) {
    const isWin = result.result === "W";
    const { teamScore, opponentScore } = parseScore(result.score);

    return (
        <div className="grid grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-black/6 py-2.5 last:border-b-0 dark:border-white/10">
            <span
                className={`inline-flex h-7 w-7 items-center justify-center text-[12px] font-semibold ${
                    isWin
                        ? "bg-[#1d428a] text-white"
                        : "bg-neutral-200 text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
                }`}
            >
                {result.result}
            </span>

            <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-neutral-950 dark:text-white">
                    vs {result.opponent}
                </p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
                    {isWin ? "Win" : "Loss"}
                </p>
            </div>

            <div className="flex min-w-[78px] items-baseline justify-end gap-1.5 tabular-nums">
                <span
                    className={`text-[18px] font-semibold tracking-[-0.03em] ${
                        isWin
                            ? "text-neutral-950 dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400"
                    }`}
                >
                    {teamScore}
                </span>
                <span className="text-[12px] text-neutral-400">-</span>
                <span
                    className={`text-[14px] font-semibold ${
                        isWin
                            ? "text-neutral-500 dark:text-neutral-400"
                            : "text-neutral-950 dark:text-white"
                    }`}
                >
                    {opponentScore}
                </span>
            </div>
        </div>
    );
}

function RecentResultList({ teamName, results }: RecentResultListProps) {
    return (
        <div className="border-t border-black/8 pt-3 dark:border-white/10">
            <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    {teamName} 최근 3경기
                </p>
                {results.length > 0 ? (
                    <span className="shrink-0 text-[11px] font-semibold tabular-nums text-neutral-950 dark:text-white">
                        {getRecord(results)}
                    </span>
                ) : null}
            </div>

            <div className="mt-2">
                {results.length > 0 ? (
                    results.map((result) => (
                        <RecentResultRow
                            key={`${teamName}-${result.opponent}-${result.score}`}
                            result={result}
                        />
                    ))
                ) : (
                    <p className="py-3 text-[13px] text-neutral-500 dark:text-neutral-400">
                        최근 경기 결과가 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}

export default function RecentResults({ game }: RecentResultsProps) {
    return (
        <div className="mt-5 border border-black/8 bg-[#fbfcfd] p-4 dark:border-white/10 dark:bg-[#17191d]">
            <div>
                <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                    최근 경기 결과
                </p>
                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                    ESPN 일정 기준 최근 흐름
                </p>
            </div>

            <div className="mt-4 grid gap-5 md:grid-cols-2">
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
