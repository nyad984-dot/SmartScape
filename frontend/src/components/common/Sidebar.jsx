import { Bot, ClipboardPlus, Gauge, Map, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  ['Dashboard', '/dashboard', Gauge],
  ['Create Report', '/report/create', ClipboardPlus],
  ['Map', '/map', Map],
  ['Assistant', '/assistant', Bot],
  ['Profile', '/profile', User],
]

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/55 p-4 lg:block">
      <div className="sticky top-20 grid gap-2">
        {items.map(([label, to, Icon]) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-sky-400/15 text-sky-200' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`
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
