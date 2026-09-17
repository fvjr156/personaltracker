import { useState } from "react"
import ScrollMenu from "./components/ScrollMenu"
import TrackerHistoryMenu from "./components/TrackerHistoryMenu"
import { useTrackerHistory } from "./hooks/useTrackerHistory"
import AppToolbar from "./components/AppToolbar";

function App() {
  const { history, logActivity, clearHistory } = useTrackerHistory();
  const [selected, setSelected] = useState<{ code: string; text: string } | null>(null);

  const handleChangeActivity = () => {
    if (!selected) return;
    logActivity(selected.code, selected.text);
  };

  return (
    <>
      <AppToolbar />
      <div className="p-6">
        <main className="flex flex-row gap-6 items-start">
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-monopro-600 select-none">
              Select Activity
            </h2>

            <ScrollMenu
              selectedCode={selected?.code ?? null}
              onSelect={(code, text) => setSelected({ code, text })}
            />

            <div className="flex flex-row gap-2">
              <button
                onClick={handleChangeActivity}
                disabled={!selected}
                className="px-4 py-2 bg-brand-600 text-monopro-50 rounded-sm font-medium text-sm hover:bg-brand-700 active:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed select-none transition-colors"
              >
                Change Activity
              </button>
              <button
                onClick={clearHistory}
                className="px-4 py-2 border border-monopro-200 text-monopro-600 rounded-sm font-medium text-sm hover:bg-monopro-200 select-none transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-monopro-600 select-none">
              History Log
            </h2>
            <TrackerHistoryMenu history={history} />
          </div>
        </main>
      </div>
    </>
  )
}

export default App