import Link from "next/link";
import InstallPrompt from "@/components/InstallPrompt";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
    { label: "오늘 경기", href: "#today-games" },
    { label: "추천 경기", href: "#featured-game" },
    { label: "순위", href: "#rankings" },
    { label: "득점 리더", href: "#leaders" },
];

export default function HomeHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/6 bg-white/92 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f172a]/88">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.05)_0%,rgba(255,255,255,0)_22%,rgba(249,115,22,0.06)_55%,rgba(244,63,94,0.05)_100%)] dark:bg-[linear-gradient(90deg,rgba(96,165,250,0.08)_0%,rgba(15,23,42,0)_24%,rgba(251,146,60,0.08)_58%,rgba(251,113,133,0.07)_100%)]" />

            <div className="relative mx-auto flex w-full max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-5 lg:h-[84px] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6">
                <div className="flex items-center gap-6 lg:gap-10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center">
                            <div
                                className="relative h-11 w-11 overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_30%,#fdba74_0%,#f97316_45%,#ea580c_75%,#c2410c_100%)] shadow-[0_6px_16px_rgba(234,88,12,0.28)] ring-1 ring-black/10 dark:ring-white/10">
                                <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#5b341a]/55"/>
                                <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#5b341a]/55"/>

                                <div
                                    className="absolute inset-y-[5px] left-[-9px] w-7 rounded-full border-2 border-[#5b341a]/55"/>
                                <div
                                    className="absolute inset-y-[5px] right-[-9px] w-7 rounded-full border-2 border-[#5b341a]/55"/>

                                <div
                                    className="absolute left-[7px] top-[7px] h-2.5 w-2.5 rounded-full bg-white/25 blur-[1px]"/>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-[16px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                NBA Game Picker
                            </p>
                            <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                                Matchup Score 기반 추천
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-10">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="inline-flex items-center border-b-2 border-transparent py-7 text-[14px] font-medium text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/about-score"
                                    className="inline-flex items-center border-b-2 border-transparent py-7 text-[14px] font-medium text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white"
                                >
                                    Matchup Score
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <Link
                        href="/about-score"
                        className="inline-flex items-center justify-center rounded-lg border border-black/8 bg-[#fff8f1] px-3 py-2 text-[13px] font-medium text-neutral-900 transition hover:bg-[#ffefdd] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:hidden"
                    >
                        Score
                    </Link>

                    <InstallPrompt />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}