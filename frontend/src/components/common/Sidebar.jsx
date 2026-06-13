import { Bot, ClipboardPlus, Gauge, Map, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const items = [
  ['Dashboard', '/dashboard', Gauge],
  ['Create Report', '/report/create', ClipboardPlus, 'CITIZEN'],
  ['Map', '/map', Map],
  ['Assistant', '/assistant', Bot],
  ['Profile', '/profile', User],
]

export default function Sidebar() {
  const { user } = useAuth()
  
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-300 bg-white/55 p-4 lg:block">
      <div className="sticky top-20 grid gap-2">
        {items.filter(item => !item[3] || user?.role === item[3]).map(([label, to, Icon]) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-sky-400/15 text-sky-200' : 'text-slate-500 hover:bg-white/70 hover:text-slate-900'}`
            }
            key={to}
            to={to}
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
