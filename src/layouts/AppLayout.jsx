import React from 'react'
import { Outlet } from "react-router-dom";
import Navigation from '../components/Navigation'

const AppLayout = () => {
  return (
    <main>
      <Navigation />
      <section className="w-[95%] sm:w-11/12 mx-auto pt-3 sm:pt-8">
        <Outlet />
      </section>
    </main>
  )
}

export default AppLayout