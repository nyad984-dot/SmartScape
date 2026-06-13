import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer.jsx'
import Navbar from '../components/common/Navbar.jsx'

export default function MainLayout() {
  return (
    <div className="min-h-screen soft-grid">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
