import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import cn from '../utils/cn'

const Layout = ({ children }) => {
    return (
        <div className='h-screen w-full bg-bg-surface
        flex flex-row'>
            <Sidebar />

            <div className={cn('flex-1 min-h-full w-full p-1 overflow-auto', 'pl-0')}>
                <div className='flex-1 min-h-full w-full bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-200'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout