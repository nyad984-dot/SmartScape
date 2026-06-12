import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
            <ShieldCheck className="h-5 w-5 text-sky-300" />
            City Safety AI
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            A resident-first smart city platform for reporting issues, routing emergency work, and helping teams respond faster.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">Quick links</h3>
          <div className="grid gap-2 text-sm text-slate-400">
            <Link to="/reports">Reports</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/map">Incident map</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">Contact</h3>
          <div className="grid gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@citysafety.ai</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +7 700 010 2026</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Almaty Civic Lab</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        Copyright 2026 City Safety AI. All rights reserved.
      </div>
    </footer>
  )
}
