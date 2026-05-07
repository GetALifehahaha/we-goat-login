import React from 'react'
import cn from '../utils/cn'
import { LoaderCircle } from 'lucide-react'

const Button = ({ text, icon: Icon, onClick, disabled, loading = false, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={cn('px-4 py-2.5 bg-mist-950 text-white rounded-full w-80 mx-auto font-semibold tracking-wide shadow mt-4 flex items-center justify-center gap-2',
                (!disabled && !loading) && 'cursor-pointer hover:bg-mist-800 hover:text-shadow-white/20 hover:text-shadow-lg hover:w-85 transition-all active:opacity-80',
                (disabled || loading) && 'opacity-50',
                disabled && 'cursor-not-allowed transition-none',
                loading && 'cursor-progress transition-none',
                className)}
        >
            {Icon &&
                <Icon size={16} />
            }
            {text &&
                <h5>{text}</h5>
            }
            {loading &&
                <LoaderCircle size={16} className='animate-spin' />
            }
        </button>
    )
}

export default Button