import Link from "next/link";
import Image from "next/image";
import { getMatchupGradient, getTeamBrand } from "@/features/nba/lib/team-brand";
import type { FeaturedGame } from "@/features/nba/types/home";

type FeaturedGameCardProps = {
    game: FeaturedGame;
};

export default function FeaturedGameCard({ game }: FeaturedGameCardProps) {
    const awayBrand = getTeamBrand(game.awayTeamAbbr);
    const homeBrand = getTeamBrand(game.homeTeamAbbr);

    return (
        <div
            className="relative overflow-hidden rounded-[14px] p-5 sm:p-6"
            style={getMatchupGradient(game.awayTeamAbbr, game.homeTeamAbbr)}
        >
            <div className="absolute inset-0 bg-white/24 dark:bg-black/18" />
            <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/34" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
            {game.awayLogoUrl ? (
                <div className="absolute -left-12 top-1/2 h-48 w-48 -translate-y-1/2 opacity-[0.12] sm:h-56 sm:w-56">
                    <Image
                        src={game.awayLogoUrl}
                        alt=""
                        fill
                        sizes="224px"
                        className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.2)]"
                    />
                </div>
            ) : null}
            {game.homeLogoUrl ? (
                <div className="absolute -right-12 top-1/2 h-48 w-48 -translate-y-1/2 opacity-[0.12] sm:h-56 sm:w-56">
                    <Image
                        src={game.homeLogoUrl}
                        alt=""
                        fill
                        sizes="224px"
                        className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.2)]"
                    />
                </div>
            ) : null}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/28 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent dark:from-black/28" />
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

            <div className="relative text-neutral-950 dark:text-white">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] text-neutral-700 dark:text-white/72">{game.time}</p>

                    <span className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] text-neutral-800 backdrop-blur-sm dark:border-white/14 dark:bg-black/24 dark:text-white/84">
            {game.streak}
          </span>
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[13px] text-neutral-700 dark:text-white/70">Away</p>
                            <div className="mt-1 flex items-center gap-2">
                <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: awayBrand.primary }}
                />
                                <h3 className="max-w-[11rem] text-[26px] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 dark:text-white sm:max-w-[14rem] sm:text-[30px]">
                                    {game.awayTeam}
                                </h3>
                            </div>
                            <p className="mt-1 text-[12px] text-neutral-600 dark:text-white/62">
                                {game.awayRecord}
                            </p>
                        </div>

                        <div className="text-[14px] font-medium text-neutral-400 dark:text-white/35">VS</div>

                        <div className="text-right">
                            <p className="text-[13px] text-neutral-700 dark:text-white/70">Home</p>
                            <div className="mt-1 flex items-center justify-end gap-2">
                                <h3 className="max-w-[11rem] text-[26px] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 dark:text-white sm:max-w-[14rem] sm:text-[30px]">
                                    {game.homeTeam}
                                </h3>
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: homeBrand.primary }}
                                />
                            </div>
                            <p className="mt-1 text-[12px] text-neutral-600 dark:text-white/62">
                                {game.homeRecord}
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 max-w-2xl text-[13px] leading-6 text-neutral-700 dark:text-white/72 sm:text-[14px]">
                        {game.reason}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm dark:border-white/14 dark:bg-black/22 dark:text-white/82">
              Closeness
            </span>
                        <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm dark:border-white/14 dark:bg-black/22 dark:text-white/82">
              Scoring
            </span>
                        <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm dark:border-white/14 dark:bg-black/22 dark:text-white/82">
              Momentum
            </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div className="rounded border border-black/10 bg-white/58 p-4 backdrop-blur-sm dark:border-white/14 dark:bg-black/20">
                            <p className="text-[11px] text-neutral-600">최근 5경기</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950 dark:text-white">
                                {game.stats.awayLast5}
                            </p>
                        </div>

                        <div className="rounded border border-black/10 bg-white/58 p-4 backdrop-blur-sm dark:border-white/14 dark:bg-black/20">
                            <p className="text-[11px] text-neutral-600">평균 득점</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950 dark:text-white">
                                {game.stats.awayPpg}
                            </p>
                        </div>

                        <div className="rounded border border-black/10 bg-white/58 p-4 backdrop-blur-sm dark:border-white/14 dark:bg-black/20">
                            <p className="text-[11px] text-neutral-600">평균 실점</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950 dark:text-white">
                                {game.stats.awayOppPpg}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <Link
                            href={`/games/${game.id}`}
                            className="inline-flex items-center justify-center rounded bg-neutral-950 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-neutral-800"
                        >
                            경기 상세 보기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
