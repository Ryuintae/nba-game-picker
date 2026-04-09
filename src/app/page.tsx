import InstallPrompt from "@/components/InstallPrompt";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
      <main className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
        <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-10">
          <div className="absolute right-6 top-6">
            <ThemeToggle />
          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            NBA Game Picker
          </p>

          <h1 className="text-4xl font-bold sm:text-6xl">
            오늘 어떤 NBA 경기를 볼지
            <br />
            빠르게 고를 수 있게
          </h1>

          <p className="mt-6 max-w-2xl text-neutral-600 dark:text-neutral-300">
            NBA 경기 데이터를 기반으로 오늘 가장 볼 만한 경기를 추천하는 서비스
          </p>

          <div className="mt-8 flex gap-3">
            <InstallPrompt />
          </div>
        </section>
      </main>
  );
}