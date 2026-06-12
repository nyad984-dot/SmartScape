import { Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const nav = [
  ['Home', '/'],
  ['Reports', '/reports'],
  ['Dashboard', '/dashboard'],
  ['Map', '/map'],
  ['Assistant', '/assistant'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-sky-400/15 text-sky-200' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-lg font-bold text-white" to="/">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-400 text-slate-950">
            <ShieldCheck className="h-5 w-5" />
          </span>
          City Safety AI
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, to]) => (
            <NavLink className={linkClass} key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <Button to="/profile" variant="secondary">Profile</Button>
              <Button onClick={logout} variant="ghost">Logout</Button>
            </>
          ) : (
            <>
              <Button to="/login" variant="ghost">Login</Button>
              <Button to="/register">Register</Button>
            </>
          )}
        </div>
        <Button aria-label="Open menu" className="lg:hidden" icon={open ? X : Menu} onClick={() => setOpen((value) => !value)} variant="secondary" />
      </div>
      {open && (
        <div className="border-t border-slate-800 px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-2 pt-3">
            {nav.map(([label, to]) => (
              <NavLink className={linkClass} key={to} onClick={() => setOpen(false)} to={to}>
                {label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2">
              {isAuthenticated ? (
                <>
                  <Button className="flex-1" to="/profile" variant="secondary">Profile</Button>
                  <Button className="flex-1" onClick={logout} variant="ghost">Logout</Button>
                </>
              ) : (
                <>
                  <Button className="flex-1" to="/login" variant="ghost">Login</Button>
                  <Button className="flex-1" to="/register">Register</Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
