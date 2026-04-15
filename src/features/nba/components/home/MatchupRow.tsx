type MatchupRowProps = {
    label: string;
    away: string;
    home: string;
    awayTeamName: string;
    homeTeamName: string;
};

export default function MatchupRow({
                                       label,
                                       away,
                                       home,
                                       awayTeamName,
                                       homeTeamName,
                                   }: MatchupRowProps) {
    return (
        <div className="grid grid-cols-[72px_1fr_1fr] items-center gap-3 rounded-[16px] border border-black/6 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1b1e23]">
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {label}
            </p>

            <div className="text-left">
                <p className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                    {away}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-400 dark:text-neutral-500">
                    {awayTeamName}
                </p>
            </div>

            <div className="text-right">
                <p className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                    {home}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-400 dark:text-neutral-500">
                    {homeTeamName}
                </p>
            </div>
        </div>
    );
}