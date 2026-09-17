import { useEffect, useState, type ReactNode } from 'react'

export const defaultMenuItems: Record<string, string> = {
  '01-001': 'Programming Work ID',
  '01-002': 'Computer Non-Work ID',
  '02-001': 'Employment Duty OD',
  '09-001': 'Errand OD',
  '09-002': 'Non-Work OD',
  '10-001': 'Default SSO',
  '20-001': 'BREAK',
  '99-001': 'LUNCH'
}

interface ScrollMenuProps {
  selectedCode: string | null;
  onSelect: (code: string, text: string) => void;
}

function loadMenuData(): Record<string, string> {
  const storedItems = localStorage.getItem('menuitems')

  if (!storedItems) {
    localStorage.setItem('menuitems', JSON.stringify(defaultMenuItems))
    return defaultMenuItems
  }

  try {
    const parsed = JSON.parse(storedItems) as Record<string, string>
    return parsed && Object.keys(parsed).length > 0 ? parsed : defaultMenuItems
  } catch {
    return defaultMenuItems
  }
}

export default function ScrollMenu({ selectedCode, onSelect }: ScrollMenuProps) {
  const [menuData, setMenuData] = useState<Record<string, string>>(defaultMenuItems)

  useEffect(() => {
    setMenuData(loadMenuData())

    const onMenuItemsUpdated = () => {
      setMenuData(loadMenuData())
    }

    window.addEventListener('menuitems:updated', onMenuItemsUpdated)
    return () => window.removeEventListener('menuitems:updated', onMenuItemsUpdated)
  }, [])

  return (
    <div className="h-50 w-100 overflow-y-scroll overflow-x-hidden border border-monopro-950 rounded-sm bg-monopro-100">
      {Object.entries(menuData).map(([k, v]: [string, string]): ReactNode => {
        const isSelected = selectedCode === k;
        return (
          <div 
            key={k} 
            onClick={() => onSelect(k, v)}
            className={`flex flex-row gap-4 px-3 py-2 select-none cursor-pointer transition-colors ${
              isSelected 
                ? 'bg-brand-100 text-brand-700 font-medium' 
                : 'hover:bg-monopro-200'
            }`}
          >
            <div className="activity-code">{k}</div>
            <div className="activity-text">{v}</div>
          </div>
        )
      })}
    </div>
  )
}