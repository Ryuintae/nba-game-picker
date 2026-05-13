import type { RecentGameResult } from "@/features/nba/types/home";

type FormTimelineProps = {
    awayTeam: string;
    homeTeam: string;
    awayResults: RecentGameResult[];
    homeResults: RecentGameResult[];
};

function getShortName(team: string) {
    const parts = team.split(" ");
    return parts.at(-1) ?? team;
}

function ResultPill({ result }: { result: RecentGameResult }) {
    const isWin = result.result === "W";

    return (
        <span
            title={`${result.result} ${result.score} vs ${result.opponent}`}
            className={`inline-flex h-6 w-6 items-center justify-center text-[11px] font-semibold ${
                isWin
                    ? "bg-[#1d428a] text-white"
                    : "bg-neutral-200 text-neutral-500 dark:bg-white/10 dark:text-neutral-400"
            }`}
        >
            {result.result}
        </span>
    );
}

function TeamTimeline({
    team,
    results,
}: {
    team: string;
    results: RecentGameResult[];
}) {
    return (
        <div className="grid grid-cols-[68px_1fr] items-center gap-3">
            <p className="truncate text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
                {getShortName(team)}
            </p>
            <div className="flex gap-1.5">
                {results.length > 0 ? (
                    results.slice(0, 5).map((result) => (
                        <ResultPill
                            key={`${team}-${result.opponent}-${result.score}`}
                            result={result}
                        />
                    ))
                ) : (
                    <span className="text-[11px] text-neutral-400">
                        최근 경기 없음
                    </span>
                )}
            </div>
        </div>
    );
}

export default function FormTimeline({
    awayTeam,
    homeTeam,
    awayResults,
    homeResults,
}: FormTimelineProps) {
    return (
        <div className="mt-4 border-y border-black/8 py-3 dark:border-white/10">
            <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold text-neutral-950 dark:text-white">
                    최근 흐름
                </p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    최근 경기 결과
                </p>
            </div>
            <div className="mt-3 space-y-2">
                <TeamTimeline team={awayTeam} results={awayResults} />
                <TeamTimeline team={homeTeam} results={homeResults} />
            </div>
        </div>
    );
}
