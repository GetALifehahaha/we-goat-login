import React from 'react'
import { X } from 'lucide-react'
import cn from '../utils/cn'

const Input = ({ name, label, value, error = "Error", isNumber = false, onChange, onClear }) => {

    console.log(error)

    const REGEX = /^[0-9]*$/

    const validateInput = (e) => {
        e.preventDefault();

        if (isNumber && !REGEX.test(e.target.value)) return

        onChange(e)
    }

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex flex-row justify-between gap-2 items-center text-sm font-medium tracking-wide'>
                <label htmlFor={name}>{label}</label>
                <h5 className=' text-slate-700'>{value.trim().length}</h5>
            </div>
            <div className={cn('px-4 py-2.5 rounded-md border-2 border-slate-300 flex flex-row items-center hover:border-slate-400 transition', error.trim() && 'border-red-300 hover:border-red-500')}>
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={validateInput}
                    className={cn('focus:outline-none w-full')}
                />
                {value && (
                    <button type='button' onClick={() => onClear(name)} className='text-xs text-slate-400 cursor-pointer ml-2' aria-label='Clear'>
                        <X size={16} />
                    </button>
                )}
            </div>
            {error && <span className="text-red-400 text-xs font-bold">{error}</span>}
        </div>
    )
}

export default Input