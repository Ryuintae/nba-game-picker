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
    shortTitle: string;
}> = [
    { key: "east", title: "동부 컨퍼런스", shortTitle: "East" },
    { key: "west", title: "서부 컨퍼런스", shortTitle: "West" },
];

function getConferenceTeams(teams: TeamRanking[], conference: Conference) {
    return teams
        .filter((team) => team.conference === conference)
        .sort((a, b) => a.rank - b.rank);
}

function getTopTeam(teams: TeamRanking[]) {
    return teams.find((team) => team.rank === 1);
}

function TeamLogo({ team, size = 34 }: { team: TeamRanking; size?: number }) {
    return (
        <div
            className="relative shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/8 dark:bg-white/10 dark:ring-white/10"
            style={{ width: size, height: size }}
        >
            {team.logoUrl ? (
                <Image
                    src={team.logoUrl}
                    alt={`${team.team} logo`}
                    fill
                    sizes={`${size}px`}
                    className="object-contain p-1"
                />
            ) : null}
        </div>
    );
}

export default function RankingTable({ teams }: RankingTableProps) {
    return (
        <Section
            title="컨퍼런스 순위"
            action={
                <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                    2025-26 정규시즌
                </span>
            }
        >
            <div className="grid gap-6 xl:grid-cols-2">
                {CONFERENCES.map((conference) => {
                    const conferenceTeams = getConferenceTeams(
                        teams,
                        conference.key
                    );
                    const topTeam = getTopTeam(conferenceTeams);

                    return (
                        <div
                            key={conference.key}
                            className="overflow-hidden border border-black/8 bg-[#fbfcfd] dark:border-white/10 dark:bg-[#15171b]"
                        >
                            <div className="border-b border-black/8 p-4 dark:border-white/10 sm:p-5">
                                <div className="flex items-end justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-semibold uppercase text-neutral-400">
                                            {conference.shortTitle} standings
                                        </p>
                                        <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                            {conference.title}
                                        </h3>
                                        <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                                            {topTeam
                                                ? `${topTeam.team} ${topTeam.record}`
                                                : "순위 데이터를 확인 중입니다"}
                                        </p>
                                    </div>

                                    {topTeam ? (
                                        <div className="flex items-center gap-2 border border-black/8 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/10">
                                            <TeamLogo team={topTeam} size={34} />
                                            <div className="hidden text-right sm:block">
                                                <p className="text-[12px] font-semibold text-neutral-950 dark:text-white">
                                                    1위
                                                </p>
                                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                                    {topTeam.winRate}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-[46px_1fr_72px_58px_44px] gap-2 border-b border-black/8 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase text-neutral-400 dark:border-white/10 dark:bg-white/[0.03]">
                                <span>순위</span>
                                <span>팀</span>
                                <span className="text-right">승패</span>
                                <span className="text-right">승률</span>
                                <span className="text-right">GB</span>
                            </div>

                            <div className="divide-y divide-black/8 dark:divide-white/10">
                                {conferenceTeams.map((team) => (
                                    <div
                                        key={`${conference.key}-${team.team}`}
                                        className="grid grid-cols-[46px_1fr_72px_58px_44px] items-center gap-2 px-4 py-3 transition hover:bg-black/[0.025] dark:hover:bg-white/[0.035]"
                                    >
                                        <span
                                            className={
                                                team.rank <= 6
                                                    ? "inline-flex h-7 w-7 items-center justify-center text-[12px] font-semibold text-neutral-950 dark:text-white"
                                                    : "inline-flex h-7 w-7 items-center justify-center text-[12px] font-semibold text-neutral-500 dark:text-neutral-400"
                                            }
                                        >
                                            {team.rank}
                                        </span>

                                        <div className="flex min-w-0 items-center gap-3">
                                            <TeamLogo team={team} />
                                            <div className="min-w-0">
                                                <p className="truncate text-[13px] font-semibold text-neutral-950 dark:text-white">
                                                    {team.team}
                                                </p>
                                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                                    {team.abbreviation ?? "NBA"}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-right text-[13px] font-semibold text-neutral-950 dark:text-white">
                                            {team.record}
                                        </span>
                                        <span className="text-right text-[13px] text-neutral-700 dark:text-neutral-200">
                                            {team.winRate}
                                        </span>
                                        <span className="text-right text-[12px] text-neutral-500 dark:text-neutral-400">
                                            {team.gamesBehind ?? "-"}
                                        </span>
                                    </div>
                                ))}

                                {conferenceTeams.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-[12px] text-neutral-500 dark:text-neutral-400">
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
