import { Outlet } from 'react-router-dom'
import cn from '../utils/cn'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../auth/context/AuthContext'
import Button from './Button'

const Layout = ({ children }) => {

    const { logout, user } = useAuth();

    console.log(user)

    return (
        <div className={cn('relative min-h-screen w-full p-4 overflow-hidden oveflow-y-auto bg-neutral-900')}>
            <h5 className='text-white uppercase font-bold tracking-wide text-xs fixed top-0 left-5 mt-4 z-1000 py-2.5 px-4 bg-neutral-950 rounded-sm border border-white/20'>Hello, {user.first_name + ' ' + user.last_name}</h5>
            <Button text='LOG OUT' icon={LogOut} onClick={logout} className='fixed top-0 right-5 z-1000 w-fit rounded-md border border-white/20 text-xs hover:w-fit hover:gap-4' />
            {/* <div className='absolute w-40 h-40 -right-10 -top-10 rounded-full blur-2xl bg-neutral-700/10 z-1' /> */}
            {/* <div className='absolute w-80 h-80 -left-10 -bottom-10 rounded-full blur-2xl bg-neutral-800/20 z-1' /> */}
            <div className='h-full w-full z-100'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout