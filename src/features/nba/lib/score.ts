import type { GameStatus } from "../types/game";

type BasicScoreInput = {
    homeScore?: number | null;
    awayScore?: number | null;
    status: GameStatus;
};

export function calculateBasicMatchupScore(input: BasicScoreInput): number {
    if (input.status === "postponed") return 0;

    if (
        input.homeScore == null ||
        input.awayScore == null ||
        input.status === "scheduled"
    ) {
        return 72;
    }

    const diff = Math.abs(input.homeScore - input.awayScore);

    if (diff <= 3) return 95;
    if (diff <= 7) return 88;
    if (diff <= 12) return 78;
    if (diff <= 20) return 65;

    return 52;
}

export function getScoreTone(score: number): string {
    if (score >= 90) {
        return "text-emerald-400";
    }

    if (score >= 80) {
        return "text-orange-400";
    }

    if (score >= 70) {
        return "text-yellow-400";
    }

    return "text-slate-400";
}