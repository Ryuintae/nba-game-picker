"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useSyncExternalStore,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_CHANGE_EVENT = "nba-theme-change";

function getThemeSnapshot(): Theme {
    if (typeof window === "undefined") {
        return "dark";
    }

    return window.localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function subscribeToThemeChange(onStoreChange: () => void) {
    window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.addEventListener("storage", onStoreChange);

    return () => {
        window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
    };
}

function applyTheme(theme: Theme) {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
}

export default function Providers({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    const theme: Theme = useSyncExternalStore(
        subscribeToThemeChange,
        getThemeSnapshot,
        (): Theme => "dark"
    );

    const setTheme = useCallback((nextTheme: Theme) => {
        applyTheme(nextTheme);
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }, []);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme, setTheme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useAppTheme() {
    const value = useContext(ThemeContext);

    if (!value) {
        throw new Error("useAppTheme must be used inside Providers");
    }

    return value;
}
