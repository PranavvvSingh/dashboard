import React from 'react'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-row flex-nowrap'>
        <Dashboard/>
        <Outlet/>
    </div>
  )
}

export default Layout