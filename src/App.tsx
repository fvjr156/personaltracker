import { useEffect, useState } from "react"
import ScrollMenu from "./components/ScrollMenu"
import TrackerHistoryMenu from "./components/TrackerHistoryMenu"
import { useTrackerHistory } from "./hooks/useTrackerHistory"
import AppToolbar from "./components/AppToolbar";
import AppFooter from "./components/AppFooter";
import Notes from "./components/Notes";

function App() {
  const [statusShow, setStatusShow] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    if (!statusShow) return;

    const timer = window.setTimeout(() => {
      setStatusShow(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [statusShow]);

  const showStatus = (message: string) => {
    setStatusMessage(message);
    setStatusShow(true);
  };

  const { history, logActivity, clearHistory } = useTrackerHistory({ onStatus: showStatus });
  const [selected, setSelected] = useState<{ code: string; text: string } | null>(null);

  const handleChangeActivity = () => {
    if (!selected) return;
    logActivity(selected.code, selected.text);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppToolbar onStatus={showStatus}/>
      <div className="p-8 flex-grow">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex flex-row gap-6 items-start">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-monopro-600 select-none">
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
              <h2 className="text-sm font-semibold uppercase tracking-wider text-monopro-600 select-none">
                History Log
              </h2>
              <TrackerHistoryMenu history={history} />
            </div>
          </div>
          <Notes onStatus={showStatus} />
        </div>
      </div>
      <AppFooter statusShow={statusShow} statusMessage={statusMessage} />
    </div>
  )
}

export default App