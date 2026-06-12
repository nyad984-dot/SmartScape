import { ShieldCheck } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen place-items-center px-4 py-8 soft-grid">
      <div className="w-full max-w-md">
        <Link className="mb-6 flex justify-center gap-2 text-xl font-bold text-white" to="/">
          <ShieldCheck className="h-6 w-6 text-sky-300" />
          City Safety AI
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
