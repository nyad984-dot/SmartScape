import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen soft-grid flex flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1 py-8 lg:pl-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
