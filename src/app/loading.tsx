export default function Loading() {
    return (
        <main
            className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f2f4f7] px-4 text-neutral-950 dark:bg-[#080b12] dark:text-white"
            role="status"
            aria-live="polite"
            aria-label="Loading NBA matchup data"
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.06]">
                <div className="absolute inset-0 [background-image:linear-gradient(90deg,rgba(29,66,138,0.9)_1px,transparent_1px),linear-gradient(rgba(249,115,22,0.7)_1px,transparent_1px)] [background-size:72px_72px] dark:[background-image:linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)]" />
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#1d428a] dark:bg-white" />
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f97316] dark:border-white" />
            </div>

            <section className="relative w-full max-w-[390px] overflow-hidden border border-black/10 bg-white px-6 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#10141b] dark:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                            Loading
                        </p>
                        <h1 className="mt-1 text-[23px] font-semibold tracking-[-0.04em]">
                            Clean shot
                        </h1>
                    </div>
                </div>

                <div className="relative mx-auto mt-6 h-[220px] w-[300px] overflow-hidden">
                    <div className="absolute inset-x-4 bottom-2 top-5 rounded-[50%] border border-black/5 dark:border-white/5" />

                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 300 220"
                        aria-hidden="true"
                    >
                        <path
                            className="loading-clean-arc"
                            d="M24 172 C72 36 177 11 231 82"
                            pathLength="100"
                        />
                    </svg>

                    <div className="absolute right-[38px] top-[72px] h-16 w-24 border-4 border-orange-500 bg-white/60 shadow-[0_14px_30px_rgba(249,115,22,0.14)] dark:bg-black/20">
                        <div className="absolute -bottom-[12px] left-1/2 h-4 w-[78px] -translate-x-1/2 rounded-b-full border-x-4 border-b-4 border-orange-500" />
                    </div>

                    <svg
                        className="loading-clean-net absolute right-[46px] top-[126px] h-[72px] w-[86px] overflow-visible"
                        viewBox="0 0 86 72"
                        aria-hidden="true"
                    >
                        <path
                            className="loading-clean-net-line"
                            d="M5 1 L16 69 M21 1 L28 69 M37 1 L40 69 M53 1 L48 69 M69 1 L60 69 M81 1 L72 69"
                        />
                        <path
                            className="loading-clean-net-line"
                            d="M5 2 C21 14 65 14 81 2 M10 23 C27 34 59 34 76 23 M15 45 C31 54 55 54 71 45"
                        />
                    </svg>

                    <div className="loading-clean-ball absolute h-8 w-8 overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_28%,#fed7aa_0%,#fb923c_34%,#ea580c_68%,#9a3412_100%)] shadow-[0_10px_22px_rgba(194,65,12,0.3)] ring-1 ring-black/10 dark:ring-white/10">
                        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#5b341a]/60" />
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#5b341a]/60" />
                        <span className="absolute inset-y-[4px] left-[-8px] w-6 rounded-full border border-[#5b341a]/60" />
                        <span className="absolute inset-y-[4px] right-[-8px] w-6 rounded-full border border-[#5b341a]/60" />
                    </div>

                    <div className="loading-clean-shadow absolute bottom-5 left-[42px] h-2 w-12 rounded-full bg-black/18 blur-[2px] dark:bg-black/40" />
                    <div className="loading-clean-flash absolute right-[62px] top-[126px] h-10 w-14 rounded-full border border-orange-500/60" />
                </div>

                <div className="border-t border-black/8 pt-4 dark:border-white/10">
                    <div className="h-2 w-full overflow-hidden bg-black/8 dark:bg-white/10">
                        <span className="loading-clean-meter block h-full bg-orange-500" />
                    </div>
                </div>
            </section>
        </main>
    );
}
