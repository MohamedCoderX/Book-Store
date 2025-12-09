import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <div>
      <AuthProvider>
      <Navbar/>
      <div className='min-h-screen max-w-screen-xl mx-auto px-4 py-6'>
      <Outlet/>
      </div>
      <Footer/>
      </AuthProvider>
    </div>
  )
}

export default App