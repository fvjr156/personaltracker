import { type ReactNode } from 'react'
import { type TrackerEntry } from '../hooks/useTrackerHistory'
import { formatTimestamp } from '../utils/dateUtils';

interface TrackerHistoryMenuProps {
  history: TrackerEntry[];
}

export default function TrackerHistoryMenu({ history }: TrackerHistoryMenuProps) {
  return (
    <div className="h-50 w-155 overflow-y-scroll overflow-x-hidden border border-monopro-950 rounded-sm bg-monopro-100 font-mono text-sm">
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
            <span className="w-57 text-monopro-400">
              {formatTimestamp(entry.timestamp)}
            </span>

            <span className="w-30 text-brand-700 font-medium">
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