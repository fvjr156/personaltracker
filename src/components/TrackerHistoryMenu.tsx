import { type ReactNode } from 'react'
import { type TrackerEntry } from '../hooks/useTrackerHistory'

interface TrackerHistoryMenuProps {
  history: TrackerEntry[];
}

export default function TrackerHistoryMenu({ history }: TrackerHistoryMenuProps) {
  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
  };

  return (
    <div className="h-50 w-125 overflow-y-scroll overflow-x-hidden border border-monopro-950 rounded-sm bg-monopro-100 font-mono text-xs">
      {history.length === 0 ? (
        <div className="px-3 py-2 text-monopro-400 italic select-none">
          No activities logged yet...
        </div>
      ) : (
        history.map((entry): ReactNode => (
          <div 
            key={entry.id} 
            className="flex flex-row items-center px-3 py-2 hover:bg-monopro-200 select-none"
          >
            <span className="w-37 text-monopro-400">
              {formatTimestamp(entry.timestamp)}
            </span>

            <span className="w-20 text-brand-700 font-medium">
              {entry.activityCode}-{entry.activitySubCode}
            </span>

            <span className="flex-1 text-monopro-950 truncate">
              {entry.activityText}
            </span>
          </div>
        ))
      )}
    </div>
  )
}