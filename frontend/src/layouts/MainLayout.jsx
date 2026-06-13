import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'

export default function MainLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen soft-grid">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div key={location.pathname} className="animate-rise">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
