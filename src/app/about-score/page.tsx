import Link from "next/link";

const scoreFactors = [
    {
        title: "Closeness",
        subtitle: "접전 가능성",
        weight: 50,
        description:
            "두 팀 전력 차이와 최근 흐름이 비슷할수록 경기 긴장감이 높아지고, 끝까지 볼 만한 가능성이 커집니다.",
        bullets: ["최근 5경기 성적 차이", "시즌 승률 차이", "맞대결 흐름"],
        badge:
            "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200",
        card:
            "border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:border-blue-400/15 dark:bg-gradient-to-br dark:from-[#111827] dark:to-[#0f172a]",
        dot: "bg-blue-500 dark:bg-blue-300",
        bar: "bg-blue-500 dark:bg-blue-300",
    },
    {
        title: "Scoring",
        subtitle: "득점 기대치",
        weight: 30,
        description:
            "양 팀의 평균 득점력과 공격 성향을 반영해 화력전 가능성과 하이라이트 기대치를 평가합니다.",
        bullets: ["팀 평균 득점", "최근 경기 득점 흐름", "공격 지표 기반 기대치"],
        badge:
            "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-200",
        card:
            "border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:border-orange-400/15 dark:bg-gradient-to-br dark:from-[#1a1410] dark:to-[#111827]",
        dot: "bg-orange-500 dark:bg-orange-300",
        bar: "bg-orange-500 dark:bg-orange-300",
    },
    {
        title: "Momentum",
        subtitle: "최근 분위기",
        weight: 20,
        description:
            "최근 상승세와 연승 흐름, 현재 팀 컨디션을 반영해 체감 재미와 몰입도를 보정합니다.",
        bullets: ["최근 5경기 성적", "연승/연패 흐름", "최근 맞대결 분위기"],
        badge:
            "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200",
        card:
            "border-rose-200 bg-gradient-to-br from-rose-50 to-white dark:border-rose-400/15 dark:bg-gradient-to-br dark:from-[#1a1116] dark:to-[#111827]",
        dot: "bg-rose-500 dark:bg-rose-300",
        bar: "bg-rose-500 dark:bg-rose-300",
    },
];

const sampleBreakdown = [
    { label: "Closeness", score: 46, base: 50, bar: "bg-blue-500 dark:bg-blue-300" },
    { label: "Scoring", score: 27, base: 30, bar: "bg-orange-500 dark:bg-orange-300" },
    { label: "Momentum", score: 18, base: 20, bar: "bg-rose-500 dark:bg-rose-300" },
];

const scoreGuide = [
    { range: "90+", label: "Must Watch", desc: "가장 먼저 확인할 만한 경기" },
    { range: "80s", label: "High Priority", desc: "충분히 기대할 수 있는 상위 경기" },
    { range: "70s", label: "Worth Checking", desc: "상황에 따라 볼 가치가 있는 경기" },
    { range: "60↓", label: "Lower Priority", desc: "상대적으로 우선순위가 낮은 경기" },
];

const totalScore = sampleBreakdown.reduce((sum, item) => sum + item.score, 0);

export default function AboutScorePage() {
    return (
        <main className="min-h-screen bg-[#f6f1e7] text-neutral-950 dark:bg-[#0b0f17] dark:text-white">
            <div className="mx-auto w-full max-w-[1360px] px-3 pb-8 pt-3 sm:px-4 lg:px-5">
                <header className="mb-3 rounded-[24px] border border-black/6 bg-white/95 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#111827]/90 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                About Watchability Score
                            </p>
                            <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                                코트 위에서 보듯이 추천 점수 구조를 한눈에 설명합니다.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                            >
                                홈으로
                            </Link>
                            <Link
                                href="/games"
                                className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                            >
                                경기 목록
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="relative mb-3 overflow-hidden rounded-[30px] border border-[#d8c3a5] bg-[linear-gradient(180deg,#f3d6ad_0%,#ecc28e_100%)] dark:border-white/10 dark:bg-[linear-gradient(180deg,#14213d_0%,#0b1220_100%)]">
                    <div className="absolute inset-0 opacity-40 dark:opacity-20">
                        <div className="absolute inset-x-[7%] top-[10%] bottom-[10%] rounded-[30px] border-2 border-white/60 dark:border-white/25" />
                        <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[2px] -translate-x-1/2 bg-white/60 dark:bg-white/25" />
                        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 dark:border-white/25" />
                        <div className="absolute left-[7%] top-1/2 h-44 w-24 -translate-y-1/2 rounded-r-[120px] border-2 border-l-0 border-white/60 dark:border-white/25" />
                        <div className="absolute right-[7%] top-1/2 h-44 w-24 -translate-y-1/2 rounded-l-[120px] border-2 border-r-0 border-white/60 dark:border-white/25" />
                        <div className="absolute left-[14%] top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border-2 border-white/60 dark:border-white/25" />
                        <div className="absolute right-[14%] top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border-2 border-white/60 dark:border-white/25" />
                    </div>

                    <div className="absolute left-[-60px] top-[-60px] h-48 w-48 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-400/20" />
                    <div className="absolute right-[-40px] top-[20px] h-52 w-52 rounded-full bg-orange-500/20 blur-3xl dark:bg-orange-400/20" />
                    <div className="absolute bottom-[-40px] right-[20%] h-44 w-44 rounded-full bg-rose-500/15 blur-3xl dark:bg-rose-400/15" />

                    <div className="relative px-5 py-6 sm:px-6 sm:py-7">
                        <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-neutral-700/60 dark:text-white/50">
                                    Court View
                                </p>
                                <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.05em] text-neutral-950 dark:text-white sm:text-[42px]">
                                    Watchability Score를
                                    <br />
                                    농구 코트 위에서 해석하는 방식
                                </h1>
                                <p className="mt-4 max-w-2xl text-[14px] leading-7 text-neutral-800/80 dark:text-white/75 sm:text-[15px]">
                                    이 페이지는 경기 추천 점수를 설명하기 위한 보조 페이지입니다.
                                    코트 위에서 어떤 요소가 재미를 만드는지 보듯이, 접전 가능성,
                                    득점 기대치, 최근 분위기를 중심으로 점수 구조를 빠르게 이해할
                                    수 있게 설계했습니다.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-blue-500/20 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-blue-700 dark:bg-white/10 dark:text-blue-200">
                    Closeness 50%
                  </span>
                                    <span className="rounded-full border border-orange-500/20 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-orange-700 dark:bg-white/10 dark:text-orange-200">
                    Scoring 30%
                  </span>
                                    <span className="rounded-full border border-rose-500/20 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-rose-700 dark:bg-white/10 dark:text-rose-200">
                    Momentum 20%
                  </span>
                                </div>
                            </div>

                            <div className="relative rounded-[28px] border border-white/70 bg-white/70 p-5 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-white/5">
                                <div className="rounded-[24px] border border-black/6 bg-[#0f172a] px-5 py-6 text-white dark:border-white/10 dark:bg-[#0b1220]">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                                        Final Score
                                    </p>

                                    <div className="mt-3 flex items-end gap-2">
                    <span className="text-[64px] font-semibold leading-none tracking-[-0.06em]">
                      {totalScore}
                    </span>
                                        <span className="pb-2 text-[15px] text-white/55">/ 100</span>
                                    </div>

                                    <p className="mt-3 text-[13px] leading-6 text-white/72">
                                        오늘 볼 경기 우선순위를 빠르게 정하는 기준 점수
                                    </p>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-[20px] border border-blue-200 bg-blue-50 p-4 dark:border-blue-400/15 dark:bg-blue-400/10">
                                        <p className="text-[11px] text-blue-700/70 dark:text-blue-200/70">Closeness</p>
                                        <p className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-blue-900 dark:text-blue-100">
                                            46
                                        </p>
                                    </div>
                                    <div className="rounded-[20px] border border-orange-200 bg-orange-50 p-4 dark:border-orange-400/15 dark:bg-orange-400/10">
                                        <p className="text-[11px] text-orange-700/70 dark:text-orange-200/70">Scoring</p>
                                        <p className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-orange-900 dark:text-orange-100">
                                            27
                                        </p>
                                    </div>
                                    <div className="rounded-[20px] border border-rose-200 bg-rose-50 p-4 dark:border-rose-400/15 dark:bg-rose-400/10">
                                        <p className="text-[11px] text-rose-700/70 dark:text-rose-200/70">Momentum</p>
                                        <p className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-rose-900 dark:text-rose-100">
                                            18
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-3 rounded-[30px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111827] sm:p-6">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                On Court Factors
                            </p>
                            <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                                코트 위 3가지 핵심 요소
                            </h2>
                        </div>

                        <div className="rounded-full border border-black/6 bg-[#f7f8fa] px-3 py-1.5 text-[12px] font-medium text-neutral-600 dark:border-white/10 dark:bg-[#1f2937] dark:text-neutral-300">
                            Watchability Formula
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.05fr_1fr]">
                        {scoreFactors.map((factor) => (
                            <article
                                key={factor.title}
                                className={`relative overflow-hidden rounded-[28px] border p-5 sm:p-6 ${factor.card}`}
                            >
                                <div className="relative">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                                {factor.subtitle}
                                            </p>
                                            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                                                {factor.title}
                                            </h3>
                                        </div>

                                        <span
                                            className={`inline-flex rounded-full border px-3 py-1 text-[12px] font-semibold ${factor.badge}`}
                                        >
                      {factor.weight}%
                    </span>
                                    </div>

                                    <p className="mt-4 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                                        {factor.description}
                                    </p>

                                    <div className="mt-5 space-y-2">
                                        {factor.bullets.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2 rounded-[16px] border border-black/6 bg-white/80 px-3 py-3 text-[13px] text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${factor.dot}`} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mb-3 grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
                    <aside className="overflow-hidden rounded-[28px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111827]">
                        <div className="h-full p-5 sm:p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                Reading Guide
                            </p>
                            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                                점수 해석 기준
                            </h2>

                            <div className="mt-5 space-y-2">
                                {scoreGuide.map((item) => (
                                    <div
                                        key={item.range}
                                        className="flex items-center justify-between gap-3 rounded-[18px] border border-black/6 bg-[#fafafa] px-4 py-3 dark:border-white/10 dark:bg-[#1f2937]"
                                    >
                                        <div>
                                            <p className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                                                {item.label}
                                            </p>
                                            <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <span className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">
                      {item.range}
                    </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-[22px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#1f2937]">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                                    Quick Read
                                </p>
                                <p className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                                    숫자가 높을수록 “먼저 볼 만한 경기”에 가깝다
                                </p>
                                <p className="mt-2 text-[13px] leading-6 text-neutral-600 dark:text-neutral-300">
                                    이 점수는 단순히 강팀 경기 여부가 아니라, 실제 체감 재미를
                                    만드는 요인들을 함께 반영한 결과입니다.
                                </p>
                            </div>
                        </div>
                    </aside>

                    <section className="rounded-[28px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111827] sm:p-6">
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                    Example Matchup
                                </p>
                                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                                    샘플 경기 분석 패널
                                </h2>
                            </div>

                            <div className="rounded-full border border-black/6 bg-[#f7f8fa] px-3 py-1.5 text-[12px] font-medium text-neutral-600 dark:border-white/10 dark:bg-[#1f2937] dark:text-neutral-300">
                                Lakers vs Warriors
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {sampleBreakdown.map((item) => {
                                const width = `${(item.score / item.base) * 100}%`;

                                return (
                                    <div
                                        key={item.label}
                                        className="rounded-[22px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#1f2937]"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                                                    {item.label}
                                                </p>
                                                <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                                                    {item.score} / {item.base}
                                                </p>
                                            </div>

                                            <p className="text-[22px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                                                {item.score}
                                            </p>
                                        </div>

                                        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-black/6 dark:bg-white/10">
                                            <div
                                                className={`h-full rounded-full ${item.bar}`}
                                                style={{ width }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </section>

                <section className="rounded-[28px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111827] sm:p-6">
                    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-end">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                                Why It Matters
                            </p>
                            <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white">
                                왜 이 페이지가 필요한가?
                            </h2>
                            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                                일정 서비스는 보통 경기 시간을 보여주는 데서 끝납니다. 하지만
                                실제 사용자는 “오늘 어떤 경기를 먼저 보면 좋을까?”를 더
                                궁금해합니다. 이 페이지는 추천 점수를 단순 숫자가 아니라 선택을
                                돕는 기준으로 이해하게 만들고, 프로젝트의 추천 로직을 더 명확히
                                설명하는 역할을 합니다.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                            >
                                홈으로 돌아가기
                            </Link>
                            <Link
                                href="/games"
                                className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-3 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                            >
                                전체 경기 보기
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}