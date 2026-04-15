import Section from "@/features/nba/components/home/Section";
import type { ScoringLeader } from "@/features/nba/types/home";

type ScoringLeadersTableProps = {
    players: ScoringLeader[];
};

export default function ScoringLeadersTable({
                                                players,
                                            }: ScoringLeadersTableProps) {
    return (
        <Section title="득점 리더">
            <div className="overflow-hidden rounded-[18px] border border-black/6 dark:border-white/10">
                <div className="grid grid-cols-[42px_1fr_62px] bg-[#f7f8fa] px-4 py-3 text-[11px] font-medium text-neutral-500 dark:bg-[#17191d] dark:text-neutral-400">
                    <span>순위</span>
                    <span>선수</span>
                    <span className="text-right">PPG</span>
                </div>

                <div className="divide-y divide-black/6 dark:divide-white/10">
                    {players.map((player) => (
                        <div
                            key={player.name}
                            className="grid grid-cols-[42px_1fr_62px] items-center px-4 py-3"
                        >
              <span className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                {player.rank}
              </span>

                            <div className="min-w-0">
                                <p className="truncate text-[13px] font-medium text-neutral-950 dark:text-white">
                                    {player.name}
                                </p>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                    {player.team}
                                </p>
                            </div>

                            <span className="text-right text-[13px] font-semibold text-neutral-950 dark:text-white">
                {player.ppg}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}