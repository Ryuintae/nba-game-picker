import { GamesList } from "@/features/nba/components/games/GamesList";
import { getTodayGamesWithArtwork } from "@/features/nba/api/get-today-games-with-artwork";
import type { GameListItem } from "@/features/nba/types/game";

export default async function GamesPage() {
    let games: GameListItem[] = [];

    try {
        games = await getTodayGamesWithArtwork();
    } catch (error) {
        console.error("Failed to fetch NBA games:", error);
    }

    return (
        <main className="min-h-screen px-6 py-10">
            <section className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <p className="text-sm font-medium text-orange-500">
                        Today&apos;s Matchups
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight">
                        오늘의 NBA 경기
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground">
                        실제 경기 데이터와 팀 이미지를 기반으로 오늘 볼 만한 경기를 비교합니다.
                    </p>
                </div>

                <GamesList games={games} />
            </section>
        </main>
    );
}