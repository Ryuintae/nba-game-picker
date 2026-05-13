import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { getTeamBrand } from "@/features/nba/lib/team-brand";
import { getScoreTone } from "@/features/nba/lib/score";
import type { HomeGameCard } from "@/features/nba/types/home";

type GameCardProps = {
    game: HomeGameCard;
};

export default function GameCard({ game }: GameCardProps) {
    const awayBrand = getTeamBrand(game.awayTeamAbbr);
    const homeBrand = getTeamBrand(game.homeTeamAbbr);
    const teamBarStyle = {
        "--away-color": awayBrand.primary,
        "--home-color": homeBrand.primary,
    } as CSSProperties;

    return (
        <Link
            href={`/games/${game.id}`}
            className="group w-[318px] shrink-0 overflow-hidden border-r border-black/8 bg-white text-neutral-950 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-[#151a22] dark:text-white dark:hover:bg-[#1a202a]"
        >
            <div
                className="h-1 bg-[linear-gradient(90deg,var(--away-color)_0%,var(--away-color)_50%,var(--home-color)_50%,var(--home-color)_100%)]"
                style={teamBarStyle}
            />

            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                            <span>{game.time}</span>
                            <span className="border border-black/10 px-1.5 py-0.5 text-[10px] leading-none text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                            KST
                            </span>
                        </div>

                        <div className="mt-3 space-y-2.5">
                            <div className="flex min-w-0 items-center gap-2.5">
                                {game.awayLogoUrl ? (
                                    <div className="relative h-7 w-7 shrink-0">
                                        <Image
                                            src={game.awayLogoUrl}
                                            alt={`${game.awayTeam} logo`}
                                            fill
                                            sizes="32px"
                                            className="object-contain p-1"
                                        />
                                    </div>
                                ) : (
                                    <span
                                        className="h-3 w-3 shrink-0 rounded-full"
                                        style={{ backgroundColor: awayBrand.primary }}
                                    />
                                )}
                                <h3 className="truncate text-[15px] font-semibold tracking-[-0.01em]">
                                    {game.awayTeam}
                                </h3>
                            </div>

                            <div className="flex min-w-0 items-center gap-2.5">
                                {game.homeLogoUrl ? (
                                    <div className="relative h-7 w-7 shrink-0">
                                        <Image
                                            src={game.homeLogoUrl}
                                            alt={`${game.homeTeam} logo`}
                                            fill
                                            sizes="32px"
                                            className="object-contain p-1"
                                        />
                                    </div>
                                ) : (
                                    <span
                                        className="h-3 w-3 shrink-0 rounded-full"
                                        style={{ backgroundColor: homeBrand.primary }}
                                    />
                                )}
                                <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">
                                    {game.homeTeam}
                                </p>
                            </div>
                        </div>
                    </div>

                    <span
                        className={`inline-flex shrink-0 border px-2.5 py-1 text-[12px] font-semibold ${getScoreTone(
                            game.score
                        )}`}
                    >
          {game.score}
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/8 pt-3 text-[11px] text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                    <span>{game.awayTeamAbbr}</span>
                    <span className="font-medium text-neutral-400 dark:text-neutral-500">
                        at
                    </span>
                    <span>{game.homeTeamAbbr}</span>
                </div>
            </div>
        </Link>
    );
}
