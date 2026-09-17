import { useTheme } from "../providers/ThemeProvider";
import { Monitor, Moon, Star, Sun } from "react-feather";

export default function AppToolbar() {
    const { mode, toggleTheme } = useTheme();
    const Icon = mode === "system" ? Monitor : mode === "light" ? Sun : mode === "dark" ? Moon : Star;
    const nextMode = mode === "system" ? "light" : mode === "light" ? "dark" : mode === "dark" ? "high contrast dark" : "system";

    return (
        <header className="border-b border-monopro-200 bg-monopro-50 px-6 py-3 dark:border-monopro-600">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-600" aria-hidden="true" />
                    <h1 className="text-sm font-semibold tracking-wide text-monopro-950">
                        Personal Tracker
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${nextMode} theme`}
                    title={`Switch to ${nextMode} theme`}
                    className="rounded-sm border border-monopro-200 p-2 text-monopro-600 transition-colors hover:border-brand-400 hover:bg-brand-100 hover:text-brand-700 dark:border-monopro-600 dark:hover:bg-brand-100 dark:hover:text-brand-700"
                >
                    <Icon size={16} aria-hidden="true" />
                </button>
            </div>
        </header>
    );
}