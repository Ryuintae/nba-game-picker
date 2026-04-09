import Link from "next/link";
import InstallPrompt from "@/components/InstallPrompt";
import ThemeToggle from "@/components/ThemeToggle";
import { featuredGame } from "@/features/nba/data/home/featured-game";
import { games } from "@/features/nba/data/home/games";
import { scoringLeaders } from "@/features/nba/data/home/scoring-leaders";
import { teamRankings } from "@/features/nba/data/home/team-rankings";
import { getScoreTone } from "@/features/nba/lib/score";
import { getMatchupGradient, getTeamBrand } from "@/features/nba/lib/team-brand";

function Section({
                   title,
                   action,
                   children,
                 }: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
      <section className="rounded-[24px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111214]">
        <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10 sm:px-5">
          <h2 className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
            {title}
          </h2>
          {action}
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </section>
  );
}

function MatchupRow({
                      label,
                      away,
                      home,
                      awayTeamName,
                      homeTeamName,
                    }: {
  label: string;
  away: string;
  home: string;
  awayTeamName: string;
  homeTeamName: string;
}) {
  return (
      <div className="grid grid-cols-[72px_1fr_1fr] items-center gap-3 rounded-[16px] border border-black/6 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1b1e23]">
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{label}</p>

        <div className="text-left">
          <p className="text-[13px] font-semibold text-neutral-950 dark:text-white">
            {away}
          </p>
          <p className="mt-0.5 text-[10px] text-neutral-400 dark:text-neutral-500">
            {awayTeamName}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[13px] font-semibold text-neutral-950 dark:text-white">
            {home}
          </p>
          <p className="mt-0.5 text-[10px] text-neutral-400 dark:text-neutral-500">
            {homeTeamName}
          </p>
        </div>
      </div>
  );
}

export default function HomePage() {
  const awayBrand = getTeamBrand(featuredGame.awayTeam);
  const homeBrand = getTeamBrand(featuredGame.homeTeam);

  return (
      <main className="min-h-screen bg-[#f3f4f6] text-neutral-950 dark:bg-[#0b0c0f] dark:text-white">
        <div className="mx-auto w-full max-w-[1600px] px-3 pb-6 pt-3 sm:px-4 lg:px-5">
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
                <InstallPrompt />
                <ThemeToggle />
              </div>
            </div>
          </header>

          <section className="mb-3 overflow-hidden rounded-[24px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111214]">
            <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10 sm:px-5">
              <div>
                <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                  오늘 경기
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  추천 점수를 기준으로 빠르게 비교
                </p>
              </div>

              <Link
                  href="/games"
                  className="text-[13px] font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                전체 보기
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto px-4 py-4 sm:px-5">
              {games.map((game) => (
                  <Link
                      key={game.id}
                      href={`/games/${game.id}`}
                      className="min-w-[240px] shrink-0 rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 transition hover:bg-[#eef1f6] dark:border-white/10 dark:bg-[#17191d] dark:hover:bg-[#1b1e23] sm:min-w-[260px]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {game.time}
                        </p>
                        <h3 className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                          {game.awayTeam}
                        </h3>
                        <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">
                          vs {game.homeTeam}
                        </p>
                      </div>

                      <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold ${getScoreTone(
                              game.score
                          )}`}
                      >
                    {game.score}
                  </span>
                    </div>
                  </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
            <section className="rounded-[24px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111214]">
              <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10 sm:px-5">
                <div>
                  <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                    오늘의 추천 경기
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    가장 먼저 볼 만한 경기
                  </p>
                </div>

                <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold ${getScoreTone(
                        featuredGame.score
                    )}`}
                >
                {featuredGame.score}점
              </span>
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
                  <div
                      className="relative overflow-hidden rounded-[22px] p-5 sm:p-6"
                      style={getMatchupGradient(
                          featuredGame.awayTeam,
                          featuredGame.homeTeam
                      )}
                  >
                    <div className="absolute inset-0 bg-white/38" />
                    <div
                        className="absolute left-0 top-0 h-full w-1.5"
                        style={{ backgroundColor: awayBrand.primary }}
                    />
                    <div
                        className="absolute right-0 top-0 h-full w-1.5"
                        style={{ backgroundColor: homeBrand.primary }}
                    />
                    <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-white/25 blur-3xl" />
                    <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-white/20 blur-3xl" />

                    <div className="relative text-neutral-950">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[12px] text-neutral-700">
                          {featuredGame.time}
                        </p>
                        <span className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
                        {featuredGame.streak}
                      </span>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[13px] text-neutral-700">Away</p>
                            <div className="mt-1 flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: awayBrand.primary }}
                            />
                              <h3 className="text-[28px] font-semibold tracking-[-0.04em] text-neutral-950 sm:text-[34px]">
                                {featuredGame.awayTeam}
                              </h3>
                            </div>
                            <p className="mt-1 text-[12px] text-neutral-600">
                              {featuredGame.awayRecord}
                            </p>
                          </div>

                          <div className="text-[14px] font-medium text-neutral-400">
                            VS
                          </div>

                          <div className="text-right">
                            <p className="text-[13px] text-neutral-700">Home</p>
                            <div className="mt-1 flex items-center justify-end gap-2">
                              <h3 className="text-[28px] font-semibold tracking-[-0.04em] text-neutral-950 sm:text-[34px]">
                                {featuredGame.homeTeam}
                              </h3>
                              <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ backgroundColor: homeBrand.primary }}
                              />
                            </div>
                            <p className="mt-1 text-[12px] text-neutral-600">
                              {featuredGame.homeRecord}
                            </p>
                          </div>
                        </div>

                        <p className="mt-6 max-w-2xl text-[13px] leading-6 text-neutral-700 sm:text-[14px]">
                          {featuredGame.reason}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
                          Closeness
                        </span>
                          <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
                          Scoring
                        </span>
                          <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[11px] text-neutral-800 backdrop-blur-sm">
                          Momentum
                        </span>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                          <div className="rounded-[18px] border border-black/10 bg-white/55 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-neutral-600">최근 5경기</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950">
                              {featuredGame.stats.awayLast5}
                            </p>
                          </div>
                          <div className="rounded-[18px] border border-black/10 bg-white/55 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-neutral-600">평균 득점</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950">
                              {featuredGame.stats.awayPpg}
                            </p>
                          </div>
                          <div className="rounded-[18px] border border-black/10 bg-white/55 p-4 backdrop-blur-sm">
                            <p className="text-[11px] text-neutral-600">평균 실점</p>
                            <p className="mt-2 text-[18px] font-semibold text-neutral-950">
                              {featuredGame.stats.awayOppPpg}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          <Link
                              href={`/games/${featuredGame.id}`}
                              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-neutral-800"
                          >
                            경기 상세 보기
                          </Link>
                          <Link
                              href="/about-score"
                              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/55 px-4 py-2.5 text-[13px] font-medium text-neutral-900 transition hover:bg-white/70"
                          >
                            점수 기준 보기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-full rounded-[22px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d] sm:p-5">
                    <div className="flex h-full flex-col">
                      <div>
                        <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                          매치업 데이터
                        </p>
                        <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                          최근 흐름과 비교 지표
                        </p>
                      </div>

                      <div className="mt-4 rounded-[18px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          최근 맞대결
                        </p>
                        <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                          {featuredGame.stats.headToHead}
                        </p>
                      </div>

                      <div className="mt-3 space-y-3">
                        <MatchupRow
                            label="최근 5경기"
                            away={featuredGame.stats.awayLast5}
                            home={featuredGame.stats.homeLast5}
                            awayTeamName={featuredGame.awayTeam}
                            homeTeamName={featuredGame.homeTeam}
                        />
                        <MatchupRow
                            label="평균 득점"
                            away={featuredGame.stats.awayPpg}
                            home={featuredGame.stats.homePpg}
                            awayTeamName={featuredGame.awayTeam}
                            homeTeamName={featuredGame.homeTeam}
                        />
                        <MatchupRow
                            label="평균 실점"
                            away={featuredGame.stats.awayOppPpg}
                            home={featuredGame.stats.homeOppPpg}
                            awayTeamName={featuredGame.awayTeam}
                            homeTeamName={featuredGame.homeTeam}
                        />
                        <MatchupRow
                            label="시즌 승률"
                            away={featuredGame.stats.awayWinRate}
                            home={featuredGame.stats.homeWinRate}
                            awayTeamName={featuredGame.awayTeam}
                            homeTeamName={featuredGame.homeTeam}
                        />
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="rounded-[18px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Away 팀
                          </p>
                          <p className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                            {featuredGame.awayTeam}
                          </p>
                          <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            원정 기준 최근 상승세
                          </p>
                        </div>

                        <div className="rounded-[18px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Home 팀
                          </p>
                          <p className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white">
                            {featuredGame.homeTeam}
                          </p>
                          <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            홈 경기력 안정적
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[20px] border border-black/6 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-[#17191d]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        최근 경기 결과
                      </p>
                      <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        최근 흐름 빠르게 확인
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[16px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Lakers 최근 3경기
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-neutral-700 dark:text-neutral-200">vs Suns</span>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                          W 121-114
                        </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-neutral-700 dark:text-neutral-200">vs Rockets</span>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                          W 118-110
                        </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-neutral-700 dark:text-neutral-200">vs Kings</span>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                          L 112-117
                        </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[16px] border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-[#1b1e23]">
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Warriors 최근 3경기
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-neutral-700 dark:text-neutral-200">vs Nuggets</span>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                          L 109-113
                        </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-neutral-700 dark:text-neutral-200">vs Mavericks</span>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                          W 122-116
                        </span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-neutral-700 dark:text-neutral-200">vs Clippers</span>
                          <span className="font-semibold text-neutral-950 dark:text-white">
                          W 119-108
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid gap-3">
              <Section title="현재 팀 순위">
                <div className="overflow-hidden rounded-[18px] border border-black/6 dark:border-white/10">
                  <div className="grid grid-cols-[42px_1fr_84px] bg-[#f7f8fa] px-4 py-3 text-[11px] font-medium text-neutral-500 dark:bg-[#17191d] dark:text-neutral-400">
                    <span>순위</span>
                    <span>팀</span>
                    <span className="text-right">승률</span>
                  </div>

                  <div className="divide-y divide-black/6 dark:divide-white/10">
                    {teamRankings.map((team) => (
                        <div
                            key={team.team}
                            className="grid grid-cols-[42px_1fr_84px] items-center px-4 py-3"
                        >
                      <span className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                        {team.rank}
                      </span>

                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-neutral-950 dark:text-white">
                              {team.team}
                            </p>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              {team.record}
                            </p>
                          </div>

                          <span className="text-right text-[13px] font-semibold text-neutral-950 dark:text-white">
                        {team.winRate}
                      </span>
                        </div>
                    ))}
                  </div>
                </div>
              </Section>

              <Section title="득점 리더">
                <div className="overflow-hidden rounded-[18px] border border-black/6 dark:border-white/10">
                  <div className="grid grid-cols-[42px_1fr_62px] bg-[#f7f8fa] px-4 py-3 text-[11px] font-medium text-neutral-500 dark:bg-[#17191d] dark:text-neutral-400">
                    <span>순위</span>
                    <span>선수</span>
                    <span className="text-right">PPG</span>
                  </div>

                  <div className="divide-y divide-black/6 dark:divide-white/10">
                    {scoringLeaders.map((player) => (
                        <div
                            key={player.name}
                            className="grid grid-cols-[42px_1fr_62px] items-center px-4 py-3"
                        >
                      <span className="text-[13px] font-semibold text-neutral-950 dark:text-white">
                        {player.rank}
                      </span>

                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-neutral-950 dark:text-white">
                              {player.name}
                            </p>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              {player.team}
                            </p>
                          </div>

                          <span className="text-right text-[13px] font-semibold text-neutral-950 dark:text-white">
                        {player.ppg}
                      </span>
                        </div>
                    ))}
                  </div>
                </div>
              </Section>
            </div>
          </section>
        </div>
      </main>
  );
}