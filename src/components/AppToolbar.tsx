import { useEffect, useRef, useState } from "react";
import { Monitor, Moon, Star, Sun } from "react-feather";
import { defaultMenuItems } from "./ScrollMenu";
import { useTheme } from "../providers/ThemeProvider";

type AppToolbarProps = {
    onStatus?: (message: string) => void;
};

const parseMenuString = (value: string): Record<string, string> => {
    const parsed: Record<string, string> = {};

    for (const line of value.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const [code, ...rest] = trimmed.split(",");
        const description = rest.join(",").trim();

        if (!code || !description) continue;
        parsed[code.trim()] = description;
    }

    return parsed;
};

const stringifyMenu = (menu: Record<string, string>) =>
    Object.entries(menu)
        .map(([code, text]) => `${code},${text}`)
        .join("\n");

export default function AppToolbar({onStatus}: AppToolbarProps) {
    const { mode, toggleTheme } = useTheme();
    const Icon = mode === "system" ? Monitor : mode === "light" ? Sun : mode === "dark" ? Moon : Star;
    const nextMode = mode === "system" ? "light" : mode === "light" ? "dark" : mode === "dark" ? "high contrast dark" : "system";
    const [editorOpen, setEditorOpen] = useState(false);
    const [menuText, setMenuText] = useState(() => stringifyMenu(defaultMenuItems));
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedItems = localStorage.getItem("menuitems");
        if (!storedItems) {
            localStorage.setItem("menuitems", JSON.stringify(defaultMenuItems));
            return;
        }

        try {
            const parsed = JSON.parse(storedItems) as Record<string, string>;
            setMenuText(stringifyMenu(parsed));
        } catch {
            setMenuText(stringifyMenu(defaultMenuItems));
        }
    }, []);

    useEffect(() => {
        if (!editorOpen) return;

        const handlePointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (editorRef.current && !editorRef.current.contains(target)) {
                setEditorOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [editorOpen]);

    const saveMenu = () => {
        const parsed = parseMenuString(menuText);
        if (Object.keys(parsed).length === 0) return;

        localStorage.setItem("menuitems", JSON.stringify(parsed));
        window.dispatchEvent(new Event("menuitems:updated"));
        onStatus?.("Activity list updated.");
        setEditorOpen(false);
    };

    const resetMenu = () => {
        const next = stringifyMenu(defaultMenuItems);
        setMenuText(next);
        localStorage.setItem("menuitems", JSON.stringify(defaultMenuItems));
        window.dispatchEvent(new Event("menuitems:updated"));
        onStatus?.("Activity list set to defaults.");
        setEditorOpen(false);
    };

    return (
        <header className="relative border-b border-monopro-200 bg-monopro-50 px-6 py-3 dark:border-monopro-600">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span
                        className="h-2.5 w-2.5 rounded-full bg-brand-600 cursor-pointer"
                        aria-label="Edit activity list"
                        title="Edit activity list"
                        onClick={() => setEditorOpen(true)}
                    />
                    <h1 className="text-sm font-semibold tracking-wide text-monopro-950 select-none">
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

            {editorOpen && (
                <div ref={editorRef} className="absolute left-6 top-full z-10 mt-2 w-96 rounded-sm border border-monopro-300 bg-monopro-50 p-3 shadow-lg">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-monopro-600">
                        Activity list
                    </label>
                    <textarea
                        value={menuText}
                        onChange={(event) => setMenuText(event.target.value)}
                        className="h-40 w-full resize-none border border-monopro-300 bg-monopro-100 p-2 text-xs font-mono text-monopro-900 outline-none focus:border-brand-500"
                        spellCheck={false}
                    />
                    <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                            type="button"
                            onClick={resetMenu}
                            className="rounded-sm border border-monopro-300 px-2 py-1 text-xs font-medium text-monopro-700 hover:bg-monopro-200"
                        >
                            Revert to default
                        </button>
                        <button
                            type="button"
                            onClick={saveMenu}
                            className="rounded-sm bg-brand-600 px-3 py-1.5 text-xs font-semibold text-monopro-50 hover:bg-brand-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}