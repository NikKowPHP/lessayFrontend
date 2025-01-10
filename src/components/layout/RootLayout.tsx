import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '@/components/Navbar'

const RootLayout: FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout