import Link from "next/link";
import { getMatchupGradient, getTeamBrand } from "@/features/nba/lib/team-brand";
import type { FeaturedGame } from "@/features/nba/types/home";

type FeaturedGameCardProps = {
    game: FeaturedGame;
};

export default function FeaturedGameCard({ game }: FeaturedGameCardProps) {
    const awayBrand = getTeamBrand(game.awayTeam);
    const homeBrand = getTeamBrand(game.homeTeam);

    return (
        <div
            className="relative overflow-hidden rounded-[22px] p-5 sm:p-6"
            style={getMatchupGradient(game.awayTeam, game.homeTeam)}
        >
            <div className="absolute inset-0 bg-white/38" />
            <div
                className="absolute left-0 top-0 h-full w-1.5"
                style={{ backgroundColor: awayBrand.primary }}
            />
            <div
                className="absolute right-0 top-0 h-full w-1.5"
                style={{ backgroundColor: homeBrand.primary }}
            />
            <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-white/25 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-white/20 blur-3xl" />

            <div className="relative text-neutral-950">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] text-neutral-700">{game.time}</p>

                    <span className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
            {game.streak}
          </span>
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[13px] text-neutral-700">Away</p>
                            <div className="mt-1 flex items-center gap-2">
                <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: awayBrand.primary }}
                />
                                <h3 className="text-[28px] font-semibold tracking-[-0.04em] text-neutral-950 sm:text-[34px]">
                                    {game.awayTeam}
                                </h3>
                            </div>
                            <p className="mt-1 text-[12px] text-neutral-600">
                                {game.awayRecord}
                            </p>
                        </div>

                        <div className="text-[14px] font-medium text-neutral-400">VS</div>

                        <div className="text-right">
                            <p className="text-[13px] text-neutral-700">Home</p>
                            <div className="mt-1 flex items-center justify-end gap-2">
                                <h3 className="text-[28px] font-semibold tracking-[-0.04em] text-neutral-950 sm:text-[34px]">
                                    {game.homeTeam}
                                </h3>
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: homeBrand.primary }}
                                />
                            </div>
                            <p className="mt-1 text-[12px] text-neutral-600">
                                {game.homeRecord}
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 max-w-2xl text-[13px] leading-6 text-neutral-700 sm:text-[14px]">
                        {game.reason}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
              Closeness
            </span>
                        <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
              Scoring
            </span>
                        <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
              Momentum
            </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div className="rounded-[18px] border border-black/10 bg-white/55 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-neutral-600">최근 5경기</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950">
                                {game.stats.awayLast5}
                            </p>
                        </div>

                        <div className="rounded-[18px] border border-black/10 bg-white/55 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-neutral-600">평균 득점</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950">
                                {game.stats.awayPpg}
                            </p>
                        </div>

                        <div className="rounded-[18px] border border-black/10 bg-white/55 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-neutral-600">평균 실점</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950">
                                {game.stats.awayOppPpg}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <Link
                            href={`/games/${game.id}`}
                            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-neutral-800"
                        >
                            경기 상세 보기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}