import React, { useState } from 'react'
import { SidebarConfig } from '../config/SidebarConfig.js'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { LogOut, SidebarIcon, User, LogIn } from 'lucide-react'
import cn from '../utils/cn.js'
import authService from '../../auth/services/authService.js'

const Sidebar = () => {

    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = authService.getCurrentUser();

    const listSidebar = [...SidebarConfig]
        .map(({ name, link, icon: Icon }, index) => (
            <NavLink className={cn('', name == 'Logout' && 'mt-auto')} key={index} to={link}>
                {({ isActive }) => (
                    <div
                        className={cn(
                            'flex items-center gap-3 px-4 py-2 rounded-md text-ct-fill-secondary',
                            isActive && 'bg-slate-200/80 rounded-lg',
                        )}
                    >
                        <Icon size={18} className={cn('aspect-square text-ct-icon/80', isActive && 'text-ct-fill-secondary')} />

                        {expanded && (
                            <>
                                <h5 className={cn("text-sm min-w-40 mt-auto text-ct-accent-secondary font-semibold", isActive && 'text-ct-fill-secondary')}>{name}</h5>
                            </>
                        )}
                    </div>
                )}
            </NavLink>
        ));

    return (
        <div className='flex flex-col p-4 px-6 transition h-screen'>
            <div className='flex justify-between items-center gap-3 px-4 py-1 rounded-md text-black mb-8'>
                {
                    expanded &&
                    <h1 className='font-bold tracking-tight text-xl'>Poreia</h1>
                }
                <SidebarIcon size={18} className='cursor-pointer hover:bg-slate-300 rounded-sm text-icon/50' onClick={() => setExpanded(!expanded)} />
            </div>


            {listSidebar}
            <hr className='my-2 text-black/20 mt-auto' />
            <div className=' p-2.5 rounded-md bg-ct-fill border border-ct-border shadow-md shadow-slate-300 mb-2
                flex gap-2 flex-col
            '>
                {
                    expanded &&
                    <>
                        <div className='flex items-center justify-between '>

                            <h5 className='text-xs font-semibold'>Guest</h5>

                            <User size={14} className='text-ct-icon' />
                        </div>
                        <hr />
                    </>
                }
                <Link
                    to={'/login'}
                    className='p-1.5 px-2.5 rounded-sm text-xs font-bold text-ct-fill bg-ct-fill-secondary cursor-pointer flex items-center justify-center gap-2'>
                    {
                        expanded &&
                        <h5>
                            Log In
                        </h5>
                    }
                    <LogIn size={14} className='text-ct-fill ml-1' />
                </Link>
            </div>
            {
                isLoggedIn &&
                <button
                    className='flex items-center gap-3 p-2.5 bg-slate-200 rounded-md text-red-400 justify-between border border-red-400/50 shadow-md shadow-red-300 cursor-pointer'
                    onClick={() => authService.logout()}>
                    {expanded &&
                        <h5 className='text-sm font-medium'>Logout</h5>
                    }
                    <LogOut />
                </button>
            }
        </div>
    )
}

export default Sidebar