import React, { useState } from 'react'
import { X, Eye, EyeClosed } from 'lucide-react'
import cn from '../utils/cn'

const Input = ({ type, name, label, value, error = "Error", placeholder = '', hasCounter = true, isNumber = false, onChange, onClear, className }) => {

    const REGEX = /^[0-9]*$/

    const validateInput = (e) => {
        e.preventDefault();

        if (isNumber && !REGEX.test(e.target.value)) return

        onChange(e)
    }

    const [showPassword, setShowPassword] = useState(!type == 'password');

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex flex-row justify-between gap-2 items-center text-sm font-medium tracking-wide'>
                <label htmlFor={name}>{label}</label>
                {hasCounter &&
                    <h5 className=' text-slate-700'>{value.trim().length}</h5>
                }
            </div>
            <div className={cn('px-4 py-2.5 rounded-md border border-white/0 shadow-white/5 shadow-xs flex flex-row items-center hover:border-slate-400 transition', error.trim() && 'border-red-500 hover:border-red-400', className)}>
                <input
                    type={(type == 'password' && showPassword) ? 'text' : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={validateInput}
                    className={cn('focus:outline-none w-full placeholder:text-white/20 placeholder:font-extralight text-white text-sm')}
                />
                {(type == 'text' && value) && (
                    <button type='button' onClick={() => onClear(name)} className='text-xs text-slate-400 cursor-pointer ml-2' aria-label='Clear'>
                        <X size={16} />
                    </button>
                )}

                {type == 'password' &&
                    <button type='button' onClick={() => handleShowPassword()} className='text-xs text-slate-400 cursor-pointer ml-2' aria-label='Clear'>
                        {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                    </button>
                }
            </div>
            {error && <span className="text-red-300/80 text-xs">{error}</span>}
        </div>
    )
}

export default Input