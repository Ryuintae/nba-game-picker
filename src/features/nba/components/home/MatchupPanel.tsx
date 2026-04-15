import MatchupRow from "@/features/nba/components/home/MatchupRow";
import type { FeaturedGame } from "@/features/nba/types/home";

type MatchupPanelProps = {
    game: FeaturedGame;
};

export default function MatchupPanel({ game }: MatchupPanelProps) {
    return (
        <div className="h-full rounded-[22px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d] sm:p-5">
            <div className="flex h-full flex-col">
                <div>
                    <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        매치업 데이터
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        최근 흐름과 비교 지표
                    </p>
                </div>

                <div className="mt-4 rounded-[18px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        최근 맞대결
                    </p>
                    <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                        {game.stats.headToHead}
                    </p>
                </div>

                <div className="mt-3 space-y-3">
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
                    />
                    <MatchupRow
                        label="시즌 승률"
                        away={game.stats.awayWinRate}
                        home={game.stats.homeWinRate}
                        awayTeamName={game.awayTeam}
                        homeTeamName={game.homeTeam}
                    />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-[18px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Away 팀
                        </p>
                        <p className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                            {game.awayTeam}
                        </p>
                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            원정 기준 최근 상승세
                        </p>
                    </div>

                    <div className="rounded-[18px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Home 팀
                        </p>
                        <p className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                            {game.homeTeam}
                        </p>
                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            홈 경기력 안정적
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}