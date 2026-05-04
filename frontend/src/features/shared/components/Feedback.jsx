import cn from '../utils/cn'

const Feedback = ({ feedback }) => {

    return (
        <div className={cn('flex flex-col gap-2 text-sm font-medium tracking-wide text-center my-4', feedback.type == 'success' && 'text-green-500', feedback.type == "error" && 'text-red-400')}>{feedback.message}</div>
    )
}

export default Feedback