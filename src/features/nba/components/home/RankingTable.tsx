import Section from "@/features/nba/components/home/Section";
import type { TeamRanking } from "@/features/nba/types/home";

type RankingTableProps = {
    teams: TeamRanking[];
};

export default function RankingTable({ teams }: RankingTableProps) {
    return (
        <Section title="현재 팀 순위">
            <div className="overflow-hidden rounded-[18px] border border-black/6 dark:border-white/10">
                <div className="grid grid-cols-[42px_1fr_84px] bg-[#f7f8fa] px-4 py-3 text-[11px] font-medium text-neutral-500 dark:bg-[#17191d] dark:text-neutral-400">
                    <span>순위</span>
                    <span>팀</span>
                    <span className="text-right">승률</span>
                </div>

                <div className="divide-y divide-black/6 dark:divide-white/10">
                    {teams.map((team) => (
                        <div
                            key={team.team}
                            className="grid grid-cols-[42px_1fr_84px] items-center px-4 py-3"
                        >
              <span className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                {team.rank}
              </span>

                            <div className="min-w-0">
                                <p className="truncate text-[13px] font-medium text-neutral-950 dark:text-white">
                                    {team.team}
                                </p>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                    {team.record}
                                </p>
                            </div>

                            <span className="text-right text-[13px] font-semibold text-neutral-950 dark:text-white">
                {team.winRate}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}