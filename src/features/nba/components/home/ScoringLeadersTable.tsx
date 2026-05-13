"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import Section from "@/features/nba/components/home/Section";
import type {
    PlayerLeaderCategory,
    ScoringLeader,
} from "@/features/nba/types/home";

type ScoringLeadersTableProps = {
    categories: PlayerLeaderCategory[];
};

function PlayerAvatar({
    player,
    size = 38,
}: {
    player: ScoringLeader;
    size?: number;
}) {
    return (
        <div
            className="relative shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-black/6 dark:bg-white/10 dark:ring-white/10"
            style={{ width: size, height: size }}
        >
            {player.headshotUrl ? (
                <Image
                    src={player.headshotUrl}
                    alt={`${player.name} headshot`}
                    fill
                    sizes={`${size}px`}
                    className="object-cover"
                />
            ) : null}
        </div>
    );
}

function getLeaderValue(player: ScoringLeader, category: PlayerLeaderCategory) {
    if (category.key === "scoring") return player.ppg;
    if (category.key === "assists") return player.apg ?? player.leaderValue ?? 0;
    if (category.key === "threePointers") {
        return player.threePointersMade ?? player.leaderValue ?? 0;
    }

    return player.leaderValue ?? 0;
}

export default function ScoringLeadersTable({
    categories,
}: ScoringLeadersTableProps) {
    const [activeKey, setActiveKey] = useState<PlayerLeaderCategory["key"]>(
        categories[0]?.key ?? "scoring"
    );
    const activeCategory = useMemo(
        () =>
            categories.find((category) => category.key === activeKey) ??
            categories[0],
        [activeKey, categories]
    );
    const players = activeCategory?.players.slice(0, 10) ?? [];
    const topPlayer = players[0];

    return (
        <Section
            title="선수 리더"
            className="h-full overflow-hidden"
            contentClassName="flex h-full flex-col p-0"
            action={
                <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                    TOP 10
                </span>
            }
        >
            <div className="border-b border-black/8 px-3 py-2.5 dark:border-white/10">
                <div className="grid grid-cols-3 bg-neutral-100 p-1 dark:bg-white/8">
                    {categories.map((category) => {
                        const isActive = category.key === activeCategory?.key;

                        return (
                            <button
                                key={category.key}
                                type="button"
                                onClick={() => setActiveKey(category.key)}
                                className={`min-w-0 px-2 py-1.5 text-[12px] font-semibold transition ${
                                    isActive
                                        ? "bg-neutral-950 text-white shadow-sm dark:bg-white dark:text-neutral-950"
                                        : "text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                                }`}
                            >
                                {category.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {topPlayer && activeCategory ? (
                <div className="relative min-h-[136px] overflow-hidden bg-neutral-950 px-4 py-5 text-white">
                    {topPlayer.teamLogoUrl ? (
                        <Image
                            src={topPlayer.teamLogoUrl}
                            alt=""
                            fill
                            sizes="420px"
                            loading="eager"
                            className="object-contain object-right opacity-[0.10]"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,115,22,0.24),transparent_50%)]" />

                    <div className="relative flex min-h-[82px] items-center gap-3.5">
                        <PlayerAvatar player={topPlayer} size={58} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase text-orange-300">
                                {activeCategory.label} 1위
                            </p>
                            <p className="truncate text-[17px] font-semibold tracking-[-0.03em]">
                                {topPlayer.name}
                            </p>
                            <p className="mt-1 text-[11px] text-white/55">
                                {topPlayer.team}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[32px] font-semibold tracking-[-0.05em]">
                                {getLeaderValue(topPlayer, activeCategory)}
                            </p>
                            <p className="text-[10px] font-semibold uppercase text-white/45">
                                {activeCategory.statLabel}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="grid grid-cols-[32px_42px_1fr_58px] border-b border-black/8 bg-[#f7f8fa] px-3 py-2 text-[10px] font-semibold uppercase text-neutral-400 dark:border-white/10 dark:bg-white/[0.03]">
                <span>순위</span>
                <span />
                <span>선수</span>
                <span className="text-right">{activeCategory?.statLabel}</span>
            </div>

            <div className="divide-y divide-black/8 dark:divide-white/10">
                {players.map((player) => {
                    const isTopPlayer = player.rank === 1;

                    return (
                        <div
                            key={`${activeCategory?.key}-${player.name}`}
                            className={`grid grid-cols-[32px_42px_1fr_58px] items-center gap-0 px-3 py-[14px] transition ${
                                isTopPlayer
                                    ? "bg-orange-50/80 dark:bg-orange-500/10"
                                    : "hover:bg-black/[0.025] dark:hover:bg-white/[0.035]"
                            }`}
                        >
                            <span
                                className={
                                    isTopPlayer
                                        ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-[12px] font-semibold text-white"
                                        : "inline-flex h-7 w-7 items-center justify-center text-[12px] font-semibold text-neutral-500 dark:text-neutral-400"
                                }
                            >
                                {player.rank}
                            </span>

                            <PlayerAvatar player={player} />

                            <div className="min-w-0 px-2">
                                <p className="truncate text-[13px] font-semibold text-neutral-950 dark:text-white">
                                    {player.name}
                                </p>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                    {player.team}
                                    {player.gamesPlayed
                                        ? ` · ${player.gamesPlayed}경기`
                                        : ""}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-[15px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                    {activeCategory
                                        ? getLeaderValue(player, activeCategory)
                                        : player.leaderValue}
                                </p>
                                <p className="text-[10px] font-semibold uppercase text-neutral-400">
                                    {activeCategory?.statLabel}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
