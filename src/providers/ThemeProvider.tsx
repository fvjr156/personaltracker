import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "system" | "light" | "dark" | "dark-hc";
export type ResolvedTheme = "light" | "dark" | "dark-hc";

interface ThemeContextType {
  mode: ThemeMode;
  theme: ResolvedTheme;
  toggleTheme: () => void;
}

const STORAGE_KEY = "personaltracker-theme";

const ThemeContext = createContext<ThemeContextType | null>(null);

const subscribeToSystemTheme = (onChange: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const getServerSystemTheme = () => false;

const getInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") return "system";

  const storedMode = localStorage.getItem(STORAGE_KEY);
  if (storedMode === "system" || storedMode === "light" || storedMode === "dark" || storedMode === "dark-hc") {
    return storedMode;
  }

  return "system";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);
  const systemIsDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerSystemTheme,
  );
  const theme: ResolvedTheme = mode === "system"
    ? systemIsDark ? "dark" : "light"
    : mode;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme !== "light");
    document.documentElement.classList.toggle("dark-hc", theme === "dark-hc");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, theme]);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const modes: ThemeMode[] = ["system", "light", "dark", "dark-hc"];
      return modes[(modes.indexOf(currentMode) + 1) % modes.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
