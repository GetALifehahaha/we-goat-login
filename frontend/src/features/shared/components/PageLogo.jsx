import React from 'react'
import { Coffee } from 'lucide-react'

const PageLogo = () => {
    return (
        <div className='flex flex-row items-center gap-2 text-white p-2.5 bg-white/10 rounded-2xl ring-2 ring-white/30 animate-pulse'>
            <Coffee size={32} opacity={0.2} />
        </div>
    )
}

export default PageLogo