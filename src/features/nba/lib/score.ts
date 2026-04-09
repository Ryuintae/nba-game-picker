export function getScoreTone(score: number) {
    if (score >= 85) {
        return "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    }

    if (score >= 75) {
        return "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-300";
    }

    if (score >= 60) {
        return "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-300";
    }

    return "border-neutral-500/20 bg-neutral-500/10 text-neutral-700 dark:text-neutral-300";
}