import Image from "next/image";

import Section from "@/features/nba/components/home/Section";
import type { ScoringLeader } from "@/features/nba/types/home";

type ScoringLeadersTableProps = {
    players: ScoringLeader[];
};

export default function ScoringLeadersTable({
    players,
}: ScoringLeadersTableProps) {
    const topPlayer = players[0];

    return (
        <Section
            title="선수 득점 순위"
            action={
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                    PPG
                </span>
            }
        >
            {topPlayer ? (
                <div className="relative mb-3 overflow-hidden rounded-[18px] border border-black/6 bg-[#f7f8fa] p-4 dark:border-white/10 dark:bg-[#17191d]">
                    {topPlayer.teamLogoUrl ? (
                        <Image
                            src={topPlayer.teamLogoUrl}
                            alt=""
                            fill
                            sizes="360px"
                            className="object-contain object-right opacity-10"
                        />
                    ) : null}
                    <div className="relative flex items-center gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-black/8 dark:bg-white/10 dark:ring-white/10">
                            {topPlayer.headshotUrl ? (
                                <Image
                                    src={topPlayer.headshotUrl}
                                    alt={`${topPlayer.name} headshot`}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            ) : null}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-orange-500">
                                리그 득점 1위
                            </p>
                            <p className="truncate text-[16px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                {topPlayer.name}
                            </p>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                {topPlayer.team}
                                {topPlayer.position ? ` · ${topPlayer.position}` : ""}
                            </p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-[24px] font-semibold tracking-[-0.05em] text-neutral-950 dark:text-white">
                                {topPlayer.ppg}
                            </p>
                            <p className="text-[10px] font-semibold uppercase text-neutral-400">
                                PPG
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="overflow-hidden rounded-[18px] border border-black/6 dark:border-white/10">
                <div className="grid grid-cols-[34px_1fr_46px_46px_46px] gap-2 bg-[#f7f8fa] px-4 py-3 text-[10px] font-semibold uppercase text-neutral-400 dark:bg-[#17191d]">
                    <span>순위</span>
                    <span>선수</span>
                    <span className="text-right">PTS</span>
                    <span className="text-right">REB</span>
                    <span className="text-right">AST</span>
                </div>

                <div className="divide-y divide-black/6 dark:divide-white/10">
                    {players.map((player) => (
                        <div
                            key={player.name}
                            className="grid grid-cols-[34px_1fr_46px_46px_46px] items-center gap-2 px-4 py-3"
                        >
                            <span className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                                {player.rank}
                            </span>

                            <div className="flex min-w-0 items-center gap-2.5">
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-black/6 dark:bg-white/10 dark:ring-white/10">
                                    {player.headshotUrl ? (
                                        <Image
                                            src={player.headshotUrl}
                                            alt={`${player.name} headshot`}
                                            fill
                                            sizes="32px"
                                            className="object-cover"
                                        />
                                    ) : null}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-medium text-neutral-950 dark:text-white">
                                        {player.name}
                                    </p>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                        {player.team}
                                        {player.gamesPlayed
                                            ? ` · ${player.gamesPlayed}경기`
                                            : ""}
                                    </p>
                                </div>
                            </div>

                            <span className="text-right text-[12px] font-semibold text-neutral-950 dark:text-white">
                                {player.ppg}
                            </span>
                            <span className="text-right text-[12px] text-neutral-500 dark:text-neutral-400">
                                {player.rpg ?? "-"}
                            </span>
                            <span className="text-right text-[12px] text-neutral-500 dark:text-neutral-400">
                                {player.apg ?? "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
