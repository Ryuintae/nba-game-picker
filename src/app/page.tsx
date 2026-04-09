import InstallPrompt from "@/components/InstallPrompt";

export default function HomePage() {
  return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-violet-400">
            NBA Game Picker
          </p>

          <h1 className="text-4xl font-bold sm:text-6xl">
            오늘 어떤 NBA 경기를 볼지
            <br />
            빠르게 고를 수 있게
          </h1>

          <p className="mt-6 max-w-2xl text-neutral-300">
            NBA 경기 데이터를 기반으로 오늘 가장 볼 만한 경기를 추천하는 서비스
          </p>

          <div className="mt-8">
            <InstallPrompt />
          </div>
        </section>
      </main>
  );
}