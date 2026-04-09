"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallPrompt() {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event as BeforeInstallPromptEvent);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setInstallPrompt(null);
            setMessage("앱이 설치되었습니다.");
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isInstalled) {
            setMessage("이미 설치된 앱입니다.");
            return;
        }

        if (!installPrompt) {
            setMessage("현재 자동 설치 프롬프트를 띄울 수 없습니다. 크롬 메뉴에서 '홈 화면에 추가' 또는 '앱 설치'를 선택해 주세요.");
            return;
        }

        const result = await installPrompt.prompt();
        console.log("install result:", result.outcome);

        if (result.outcome === "dismissed") {
            setMessage("설치를 취소했습니다.");
        }

        setInstallPrompt(null);
    };

    return (
        <div className="flex flex-col items-start gap-3">
            <button
                onClick={handleInstallClick}
                className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
                앱 설치하기
            </button>

            {message ? (
                <p className="text-sm text-neutral-400">{message}</p>
            ) : null}
        </div>
    );
}