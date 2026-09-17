import { useState, useEffect } from "react";

export type TrackerEntry = {
  id: string;
  activityCode: string;
  activitySubCode: string;
  activityText: string;
  timestamp: string;
};

const STORAGE_KEY = "personaltracker-history";

export function useTrackerHistory() {
  const [history, setHistory] = useState<TrackerEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const logActivity = (codeStr: string, text: string) => {
    const [activityCode, activitySubCode] = codeStr.split("-");
    if (!activityCode || !activitySubCode) return;

    const newEntry: TrackerEntry = {
      id: crypto.randomUUID(),
      activityCode,
      activitySubCode,
      activityText: text,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => [newEntry, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  return { history, logActivity, clearHistory };
}