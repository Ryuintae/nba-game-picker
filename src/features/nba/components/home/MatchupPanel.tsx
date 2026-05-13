import MatchupRow from "@/features/nba/components/home/MatchupRow";
import type { FeaturedGame } from "@/features/nba/types/home";

type MatchupPanelProps = {
    game: FeaturedGame;
};

export default function MatchupPanel({ game }: MatchupPanelProps) {
    return (
        <div className="h-full border border-black/8 bg-[#fbfcfd] p-4 dark:border-white/10 dark:bg-[#17191d] sm:p-5">
            <div className="flex h-full flex-col">
                <div>
                    <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        매치업 데이터
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        최근 흐름과 비교 지표
                    </p>
                </div>

                <div className="mt-4 border-y border-black/8 py-3 dark:border-white/10">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                            최근 맞대결
                        </p>
                        <p className="text-right text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                            {game.stats.headToHead}
                        </p>
                    </div>
                </div>

                <div className="mt-2">
                    <MatchupRow
                        label="최근 5경기"
                        away={game.stats.awayLast5}
                        home={game.stats.homeLast5}
                        awayTeamName={game.awayTeam}
                        homeTeamName={game.homeTeam}
                    />
                    <MatchupRow
                        label="평균 득점"
                        away={game.stats.awayPpg}
                        home={game.stats.homePpg}
                        awayTeamName={game.awayTeam}
                        homeTeamName={game.homeTeam}
                    />
                    <MatchupRow
                        label="평균 실점"
                        away={game.stats.awayOppPpg}
                        home={game.stats.homeOppPpg}
                        awayTeamName={game.awayTeam}
                        homeTeamName={game.homeTeam}
                        higherIsBetter={false}
                    />
                    <MatchupRow
                        label="승률"
                        away={game.stats.awayWinRate}
                        home={game.stats.homeWinRate}
                        awayTeamName={game.awayTeam}
                        homeTeamName={game.homeTeam}
                    />
                </div>

                <div className="mt-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-black/8 pt-3 text-[11px] font-medium text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                    <span className="truncate">{game.awayTeam}</span>
                    <span className="text-neutral-400 dark:text-neutral-500">at</span>
                    <span className="truncate text-right">{game.homeTeam}</span>
                </div>
            </div>
        </div>
    );
}
