import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "personaltracker-notes";

type UseNotesOptions = {
  onStatus?: (message: string) => void;
};

export default function useNotes(onStatus?: UseNotesOptions["onStatus"]) {
  const [notes, setNotes] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, notes);
    } catch {
      // ignore storage write failures
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onStatus?.("Notes saved after inactivity");
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [notes, onStatus]);

  return { notes, setNotes };
}
