import Link from "next/link";

const scoreFactors = [
    {
        title: "Closeness",
        description:
            "두 팀의 전력 차이와 최근 흐름이 얼마나 비슷한지 반영합니다. 접전 가능성이 높을수록 더 높은 점수를 받습니다.",
        weight: "50%",
        examples: [
            "최근 5경기 성적 차이",
            "시즌 승률 차이",
            "맞대결 흐름",
        ],
    },
    {
        title: "Scoring",
        description:
            "양 팀의 평균 득점력과 공격 템포를 바탕으로 경기 자체의 화력 기대치를 반영합니다.",
        weight: "30%",
        examples: [
            "팀 평균 득점",
            "최근 경기 득점 흐름",
            "공격 지표 기반 기대치",
        ],
    },
    {
        title: "Momentum",
        description:
            "최근 경기력 상승세, 연승/연패 흐름, 현재 분위기를 반영합니다. 최근 컨디션이 좋은 팀이 포함된 경기는 더 흥미롭게 볼 가능성이 있습니다.",
        weight: "20%",
        examples: [
            "최근 5경기 성적",
            "연승/연패 흐름",
            "최근 맞대결 분위기",
        ],
    },
];

const sampleBreakdown = [
    { label: "Closeness", score: 46, base: 50 },
    { label: "Scoring", score: 27, base: 30 },
    { label: "Momentum", score: 18, base: 20 },
];

const totalScore = sampleBreakdown.reduce((sum, item) => sum + item.score, 0);

export default function AboutScorePage() {
    return (
        <main className="min-h-screen bg-[#f3f4f6] text-neutral-950 dark:bg-[#0b0c0f] dark:text-white">
            <div className="mx-auto w-full max-w-[1200px] px-3 pb-8 pt-3 sm:px-4 lg:px-5">
                <header className="mb-3 rounded-[22px] border border-black/6 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#111214] sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                About Watchability Score
                            </p>
                            <p className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400">
                                경기 추천 점수가 어떤 기준으로 계산되는지 설명합니다.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
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

                <section className="mb-3 rounded-[24px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111214] sm:p-6">
                    <div className="max-w-3xl">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                            Score Overview
                        </p>
                        <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-neutral-950 dark:text-white sm:text-[34px]">
                            Watchability Score는 오늘 어떤 경기를 먼저 보면 좋을지 빠르게
                            판단하도록 돕는 추천 점수입니다.
                        </h1>
                        <p className="mt-4 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                            이 프로젝트는 단순히 경기 일정을 나열하는 것이 아니라, 여러 경기
                            중에서 어떤 매치업이 더 재미있고 볼 만한지 빠르게 선택할 수 있게
                            하는 것을 목표로 합니다. Watchability Score는 그런 선택을 돕기
                            위한 기준 점수이며, 접전 가능성, 득점 기대치, 최근 흐름을 함께
                            고려해 계산합니다.
                        </p>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                핵심 목적
                            </p>
                            <p className="mt-2 text-[16px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                오늘 볼 경기 선택 지원
                            </p>
                            <p className="mt-2 text-[13px] leading-6 text-neutral-700 dark:text-neutral-300">
                                여러 경기 중 우선순위를 빠르게 정할 수 있도록 돕습니다.
                            </p>
                        </div>

                        <div className="rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                점수 범위
                            </p>
                            <p className="mt-2 text-[16px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                0점 ~ 100점
                            </p>
                            <p className="mt-2 text-[13px] leading-6 text-neutral-700 dark:text-neutral-300">
                                점수가 높을수록 먼저 볼 만한 경기로 판단합니다.
                            </p>
                        </div>

                        <div className="rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                반영 요소
                            </p>
                            <p className="mt-2 text-[16px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                접전성 + 화력 + 흐름
                            </p>
                            <p className="mt-2 text-[13px] leading-6 text-neutral-700 dark:text-neutral-300">
                                경기의 재미를 단일 수치가 아니라 복합 기준으로 해석합니다.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-3 grid gap-3 lg:grid-cols-3">
                    {scoreFactors.map((factor) => (
                        <article
                            key={factor.title}
                            className="rounded-[24px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111214] sm:p-6"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                                        Factor
                                    </p>
                                    <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                                        {factor.title}
                                    </h2>
                                </div>

                                <span className="inline-flex rounded-full border border-black/10 px-3 py-1 text-[12px] font-semibold text-neutral-700 dark:border-white/10 dark:text-neutral-200">
                  {factor.weight}
                </span>
                            </div>

                            <p className="mt-4 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                                {factor.description}
                            </p>

                            <div className="mt-5">
                                <p className="text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
                                    반영 예시
                                </p>
                                <ul className="mt-3 space-y-2">
                                    {factor.examples.map((example) => (
                                        <li
                                            key={example}
                                            className="rounded-[14px] border border-black/6 bg-[#f8f9fb] px-3 py-2 text-[13px] text-neutral-700 dark:border-white/10 dark:bg-[#17191d] dark:text-neutral-300"
                                        >
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="mb-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                    <section className="rounded-[24px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111214] sm:p-6">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                            Example
                        </p>
                        <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                            샘플 점수 계산 예시
                        </h2>
                        <p className="mt-3 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                            아래 예시는 특정 경기의 추천 점수를 어떻게 구성 요소별로 나눠서
                            해석할 수 있는지 보여주는 샘플입니다. 실제 계산식은 이후 더
                            고도화될 수 있지만, 현재는 이 구조를 통해 점수 의미를 이해하는
                            것이 핵심입니다.
                        </p>

                        <div className="mt-6 overflow-hidden rounded-[20px] border border-black/6 dark:border-white/10">
                            <div className="grid grid-cols-[1fr_120px_120px] bg-[#f7f8fa] px-4 py-3 text-[11px] font-medium text-neutral-500 dark:bg-[#17191d] dark:text-neutral-400">
                                <span>항목</span>
                                <span className="text-right">획득 점수</span>
                                <span className="text-right">배점</span>
                            </div>

                            <div className="divide-y divide-black/6 dark:divide-white/10">
                                {sampleBreakdown.map((item) => (
                                    <div
                                        key={item.label}
                                        className="grid grid-cols-[1fr_120px_120px] items-center px-4 py-4"
                                    >
                    <span className="text-[14px] font-medium text-neutral-950 dark:text-white">
                      {item.label}
                    </span>
                                        <span className="text-right text-[14px] font-semibold text-neutral-950 dark:text-white">
                      {item.score}
                    </span>
                                        <span className="text-right text-[13px] text-neutral-500 dark:text-neutral-400">
                      {item.base}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className="rounded-[24px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111214] sm:p-6">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                            Result
                        </p>
                        <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                            총점 {totalScore}점
                        </h2>
                        <p className="mt-3 text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                            이 예시에서는 접전 가능성과 득점 기대치가 높고 최근 흐름도
                            안정적이라고 가정했기 때문에 높은 점수가 나옵니다. 즉 단순히 강팀
                            경기라서가 아니라, 실제로 볼 만한 요소가 복합적으로 반영된
                            결과입니다.
                        </p>

                        <div className="mt-5 rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                해석 기준 예시
                            </p>

                            <div className="mt-3 space-y-2 text-[13px] text-neutral-700 dark:text-neutral-300">
                                <p>90점 이상: 가장 먼저 확인할 만한 경기</p>
                                <p>80점대: 충분히 기대할 만한 상위 경기</p>
                                <p>70점대: 상황에 따라 볼 가치가 있는 경기</p>
                                <p>60점 이하: 상대적으로 우선순위가 낮은 경기</p>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="rounded-[24px] border border-black/6 bg-white p-5 dark:border-white/10 dark:bg-[#111214] sm:p-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                        Why It Matters
                    </p>
                    <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                        이 페이지가 필요한 이유
                    </h2>
                    <p className="mt-4 max-w-3xl text-[14px] leading-7 text-neutral-700 dark:text-neutral-300">
                        스포츠 일정 서비스는 보통 경기 시간을 보여주는 데서 끝나는 경우가
                        많습니다. 하지만 실제 사용자는 단순 일정 확인보다, 오늘 어떤 경기를
                        먼저 보면 좋을지 빠르게 알고 싶어합니다. 이 페이지는 그 추천 기준을
                        명확하게 설명함으로써, 점수 자체를 단순 숫자가 아니라 선택을 돕는
                        정보로 이해하게 만드는 역할을 합니다.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-neutral-800"
                        >
                            홈으로 돌아가기
                        </Link>
                        <Link
                            href="/games"
                            className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2.5 text-[13px] font-medium text-neutral-900 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                            전체 경기 보기
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}