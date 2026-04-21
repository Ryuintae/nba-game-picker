import Link from "next/link";
import { notFound } from "next/navigation";
import { getScoreTone } from "@/features/nba/lib/score";
import { gameDetailMap } from "@/features/nba/data/games/game-detail";

type GameDetailPageProps = {
    params: Promise<{
        gameId: string;
    }>;
};

export default async function GameDetailPage({
                                                 params,
                                             }: GameDetailPageProps) {
    const { gameId } = await params;
    const game = gameDetailMap[gameId];

    if (!game) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f3f4f6] text-neutral-950 dark:bg-[#0b0c0f] dark:text-white">
            <div className="mx-auto w-full max-w-[1200px] px-3 pb-6 pt-3 sm:px-4 lg:px-5">
                <header className="mb-3 rounded-[22px] border border-black/6 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#111214] sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                {game.awayTeam} vs {game.homeTeam}
                            </p>
                            <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                                경기 상세 정보와 추천 근거
                            </p>
                        </div>

                        <Link
                            href="/games"
                            className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                            목록으로
                        </Link>
                    </div>
                </header>

                <section className="rounded-[24px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111214] sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                                {game.time}
                            </p>
                            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white sm:text-[34px]">
                                {game.awayTeam} vs {game.homeTeam}
                            </h1>
                            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                                {game.reason}
                            </p>
                        </div>

                        <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-[13px] font-semibold ${getScoreTone(
                                game.score
                            )}`}
                        >
              {game.score}점
            </span>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        <div className="rounded-[18px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                최근 5경기
                            </p>
                            <div className="mt-3 flex items-center justify-between text-[14px]">
                                <span>{game.awayTeam}</span>
                                <strong>{game.stats.awayLast5}</strong>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[14px]">
                                <span>{game.homeTeam}</span>
                                <strong>{game.stats.homeLast5}</strong>
                            </div>
                        </div>

                        <div className="rounded-[18px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                평균 득점
                            </p>
                            <div className="mt-3 flex items-center justify-between text-[14px]">
                                <span>{game.awayTeam}</span>
                                <strong>{game.stats.awayPpg}</strong>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[14px]">
                                <span>{game.homeTeam}</span>
                                <strong>{game.stats.homePpg}</strong>
                            </div>
                        </div>

                        <div className="rounded-[18px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                평균 실점
                            </p>
                            <div className="mt-3 flex items-center justify-between text-[14px]">
                                <span>{game.awayTeam}</span>
                                <strong>{game.stats.awayOppPpg}</strong>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[14px]">
                                <span>{game.homeTeam}</span>
                                <strong>{game.stats.homeOppPpg}</strong>
                            </div>
                        </div>

                        <div className="rounded-[18px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                시즌 승률
                            </p>
                            <div className="mt-3 flex items-center justify-between text-[14px]">
                                <span>{game.awayTeam}</span>
                                <strong>{game.stats.awayWinRate}</strong>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[14px]">
                                <span>{game.homeTeam}</span>
                                <strong>{game.stats.homeWinRate}</strong>
                            </div>
                        </div>

                        <div className="rounded-[18px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d] md:col-span-2 xl:col-span-2">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                최근 맞대결
                            </p>
                            <p className="mt-3 text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                {game.stats.headToHead}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}