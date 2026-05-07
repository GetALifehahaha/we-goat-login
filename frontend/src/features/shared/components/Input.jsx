import cn from '../utils/cn'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

const Input = ({ type, name, label, defaultValue, error = " ", placeholder = '', hasCounter, className }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex flex-row justify-between gap-2 items-center text-sm font-medium tracking-wide text-white'>
                <label htmlFor={name}>{label}</label>
                {hasCounter &&
                    <h5 className=' text-slate-700'>{defaultValue.trim().length}</h5>
                }
            </div>
            <div className={cn('relative px-4 py-2.5 rounded-md border border-white/0 shadow-white/5 shadow-xs flex flex-row items-center hover:border-slate-400 transition', error.trim() && 'border-red-500 hover:border-red-400', className)}>
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={cn('focus:outline-none w-full placeholder:text-white/20 placeholder:font-extralight text-white text-sm')}
                />
                {type == 'password' &&
                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPassword(p => !p);
                        }}
                        className='text-white absolute right-1.5 cursor-pointer p-2 hover:bg-neutral-700/20 rounded-xl'>
                        {showPassword ?
                            <Eye size={14} /> :
                            <EyeClosed size={14} />
                        }
                    </button>
                }
            </div>
            <span className="text-red-300/80 text-xs">{error}</span>
        </div>
    )
}

export default Input