import Image from "next/image";

import Section from "@/features/nba/components/home/Section";
import type { TeamRanking } from "@/features/nba/types/home";

type RankingTableProps = {
    teams: TeamRanking[];
};

type Conference = "east" | "west";

const CONFERENCES: Array<{
    key: Conference;
    title: string;
    label: string;
}> = [
    { key: "east", title: "동부 컨퍼런스", label: "East" },
    { key: "west", title: "서부 컨퍼런스", label: "West" },
];

function getConferenceTeams(teams: TeamRanking[], conference: Conference) {
    return teams
        .filter((team) => team.conference === conference)
        .sort((a, b) => a.rank - b.rank);
}

function getTopTeam(teams: TeamRanking[]) {
    return teams.find((team) => team.rank === 1);
}

export default function RankingTable({ teams }: RankingTableProps) {
    return (
        <Section
            title="컨퍼런스 순위"
            action={
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                    2025-26
                </span>
            }
        >
            <div className="grid gap-3 2xl:grid-cols-2">
                {CONFERENCES.map((conference) => {
                    const conferenceTeams = getConferenceTeams(
                        teams,
                        conference.key
                    );
                    const topTeam = getTopTeam(conferenceTeams);

                    return (
                        <div
                            key={conference.key}
                            className="overflow-hidden rounded-[18px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#14161a]"
                        >
                            <div className="relative overflow-hidden bg-[#f7f8fa] px-4 py-4 dark:bg-[#17191d]">
                                {topTeam?.fanartUrl ? (
                                    <Image
                                        src={topTeam.fanartUrl}
                                        alt=""
                                        fill
                                        sizes="(min-width: 1536px) 360px, 100vw"
                                        className="object-cover opacity-12"
                                    />
                                ) : null}
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/55 dark:from-[#17191d] dark:via-[#17191d]/92 dark:to-[#17191d]/70" />

                                <div className="relative flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                                            {conference.title}
                                        </p>
                                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                            {topTeam
                                                ? `1위 ${topTeam.team}`
                                                : conference.label}
                                        </p>
                                    </div>
                                    {topTeam?.logoUrl ? (
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/8 dark:bg-white/10 dark:ring-white/10">
                                            <Image
                                                src={topTeam.logoUrl}
                                                alt={`${topTeam.team} logo`}
                                                fill
                                                sizes="40px"
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-[42px_1fr_54px_48px_38px] gap-2 border-y border-black/6 px-4 py-2 text-[10px] font-semibold uppercase text-neutral-400 dark:border-white/10">
                                <span>순위</span>
                                <span>팀</span>
                                <span className="text-right">승패</span>
                                <span className="text-right">승률</span>
                                <span className="text-right">GB</span>
                            </div>

                            <div className="divide-y divide-black/6 dark:divide-white/10">
                                {conferenceTeams.map((team) => (
                                    <div
                                        key={`${conference.key}-${team.team}`}
                                        className="grid grid-cols-[42px_1fr_54px_48px_38px] items-center gap-2 px-4 py-3"
                                    >
                                        <span className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                                            {team.rank}
                                        </span>

                                        <div className="flex min-w-0 items-center gap-2.5">
                                            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-black/6 dark:bg-white/10 dark:ring-white/10">
                                                {team.logoUrl ? (
                                                    <Image
                                                        src={team.logoUrl}
                                                        alt={`${team.team} logo`}
                                                        fill
                                                        sizes="32px"
                                                        className="object-contain p-1"
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-[13px] font-medium text-neutral-950 dark:text-white">
                                                    {team.team}
                                                </p>
                                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                                    {team.abbreviation ?? "NBA"}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-right text-[12px] font-semibold text-neutral-950 dark:text-white">
                                            {team.record}
                                        </span>
                                        <span className="text-right text-[12px] font-semibold text-neutral-950 dark:text-white">
                                            {team.winRate}
                                        </span>
                                        <span className="text-right text-[12px] text-neutral-500 dark:text-neutral-400">
                                            {team.gamesBehind ?? "-"}
                                        </span>
                                    </div>
                                ))}

                                {conferenceTeams.length === 0 ? (
                                    <div className="px-4 py-6 text-center text-[12px] text-neutral-500 dark:text-neutral-400">
                                        순위 데이터를 불러오지 못했습니다.
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
