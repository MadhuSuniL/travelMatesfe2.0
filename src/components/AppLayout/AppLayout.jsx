import React from 'react'
import Drawer from './Drawer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className=''>
        <Drawer>
            <Outlet/>
        </Drawer>
    </div>
  )
}
export default AppLayout