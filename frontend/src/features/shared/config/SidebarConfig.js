import {HomeIcon, File, Info, User2} from 'lucide-react'

export const SidebarConfig = [
    {
        name: 'Home',
        link: '/',
        icon: HomeIcon
    },
    {
        name: 'Projects',
        link: '/projects',
        icon: File
    },
    {
        name: 'Resume',
        link: '/resume',
        icon: User2
    },
    {
        name: 'About',
        link: '/about',
        icon: Info
    }
]