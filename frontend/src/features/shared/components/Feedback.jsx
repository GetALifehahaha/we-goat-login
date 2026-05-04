import React from 'react'
import cn from '../utils/cn'
import { Dot } from 'lucide-react'

const Feedback = ({ feedback }) => {
    console.log("Feedback: ", feedback)

    const listFeedback = feedback.map(({ type, message }, index) => {
        if (type && message) return <h5 key={index}
            className={cn('text-mauve-950 flex items-center', type == 'error' && 'text-red-500')}
        >
            <Dot />
            {message}
        </h5>
    })

    return (
        <div className={cn('flex flex-col gap-2 text-xs font-medium tracking-wide')}>{listFeedback}</div>
    )
}

export default Feedback