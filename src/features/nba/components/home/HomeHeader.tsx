import InstallPrompt from "@/components/InstallPrompt";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function HomeHeader() {
    return (
        <header className="sticky top-0 z-30 mb-3 rounded-[22px] border border-black/6 bg-white/92 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#111214]/88">
            <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500" />

                    <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold tracking-[-0.02em]">
                            NBA Game Picker
                        </p>
                        <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                            Today’s games, rankings and leaders
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href="/about-score"
                        className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/55 px-4 py-2.5 text-[13px] font-medium text-neutral-900 transition hover:bg-white/70"
                    >
                        점수 기준 보기
                    </Link>
                    <InstallPrompt />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}