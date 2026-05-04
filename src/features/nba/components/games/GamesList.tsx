import Link from "next/link";
import type { GameListItem } from "../../types/game";

type GamesListProps = {
    games: GameListItem[];
};

export function GamesList({ games }: GamesListProps) {
    if (games.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed p-10 text-center">
                <h2 className="text-lg font-semibold">
                    오늘 예정된 경기가 없습니다
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    조회한 날짜에 표시할 경기가 없습니다.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {games.map((game) => (
                <Link
                    key={game.id}
                    href={`/games/${game.id}`}
                    className="rounded-3xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                            <TeamLogo
                                src={game.awayTeam.logoUrl}
                                alt={game.awayTeam.displayName}
                            />

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {game.startTime} · {game.statusText}
                                </p>

                                <h2 className="mt-2 text-xl font-bold">
                                    {game.awayTeam.abbreviation} @{" "}
                                    {game.homeTeam.abbreviation}
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {game.summary}
                                </p>
                            </div>

                            <TeamLogo
                                src={game.homeTeam.logoUrl}
                                alt={game.homeTeam.displayName}
                            />
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-medium text-muted-foreground">
                                Matchup Score
                            </p>
                            <p className="mt-1 text-3xl font-black">
                                {game.matchupScore}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function TeamLogo({ src, alt }: { src?: string | null; alt: string }) {
    if (!src) {
        return (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-xs font-bold">
                NBA
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="h-12 w-12 rounded-full object-contain"
        />
    );
}