import Link from "next/link";
import { getScoreTone } from "@/features/nba/lib/score";
import type { HomeGameCard } from "@/features/nba/types/home";

type GameCardProps = {
    game: HomeGameCard;
};

export default function GameCard({ game }: GameCardProps) {
    return (
        <Link
            href={`/games/${game.id}`}
            className="min-w-[240px] shrink-0 rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 transition hover:bg-[#eef1f6] dark:border-white/10 dark:bg-[#17191d] dark:hover:bg-[#1b1e23] sm:min-w-[260px]"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {game.time}
                    </p>

                    <h3 className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        {game.awayTeam}
                    </h3>

                    <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">
                        vs {game.homeTeam}
                    </p>
                </div>

                <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold ${getScoreTone(
                        game.score
                    )}`}
                >
          {game.score}
        </span>
            </div>
        </Link>
    );
}