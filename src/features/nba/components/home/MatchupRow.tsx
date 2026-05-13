type MatchupRowProps = {
    label: string;
    away: string;
    home: string;
    awayTeamName: string;
    homeTeamName: string;
    higherIsBetter?: boolean;
};

function parseStatValue(value: string) {
    const trimmedValue = value.trim();

    if (trimmedValue.includes("-")) {
        const [wins, losses] = trimmedValue.split("-").map(Number);

        if (Number.isFinite(wins) && Number.isFinite(losses)) {
            const total = wins + losses;
            return total > 0 ? wins / total : 0;
        }
    }

    const numericValue = Number(trimmedValue.replace(/[^\d.-]/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
}

function getBarWidths(awayValue: number, homeValue: number) {
    const maxValue = Math.max(Math.abs(awayValue), Math.abs(homeValue), 1);

    return {
        away: Math.max(8, (Math.abs(awayValue) / maxValue) * 100),
        home: Math.max(8, (Math.abs(homeValue) / maxValue) * 100),
    };
}

export default function MatchupRow({
    label,
    away,
    home,
    awayTeamName,
    homeTeamName,
    higherIsBetter = true,
}: MatchupRowProps) {
    const awayValue = parseStatValue(away);
    const homeValue = parseStatValue(home);
    const widths = getBarWidths(awayValue, homeValue);
    const awayLeads = higherIsBetter
        ? awayValue >= homeValue
        : awayValue <= homeValue;
    const homeLeads = higherIsBetter
        ? homeValue >= awayValue
        : homeValue <= awayValue;

    return (
        <div className="border-b border-black/8 py-3 last:border-b-0 dark:border-white/10">
            <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    {label}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                    <span className="max-w-[86px] truncate">{awayTeamName}</span>
                    <span>vs</span>
                    <span className="max-w-[86px] truncate">{homeTeamName}</span>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-[54px_1fr_54px] items-center gap-3">
                <p
                    className={`text-[13px] font-semibold ${
                        awayLeads
                            ? "text-neutral-950 dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400"
                    }`}
                >
                    {away}
                </p>

                <div className="grid gap-1.5">
                    <div className="h-2 bg-neutral-200 dark:bg-white/10">
                        <div
                            className="h-full bg-[#1d428a]"
                            style={{ width: `${widths.away}%` }}
                        />
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-white/10">
                        <div
                            className="ml-auto h-full bg-orange-500"
                            style={{ width: `${widths.home}%` }}
                        />
                    </div>
                </div>

                <p
                    className={`text-right text-[13px] font-semibold ${
                        homeLeads
                            ? "text-neutral-950 dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400"
                    }`}
                >
                    {home}
                </p>
            </div>
        </div>
    );
}
