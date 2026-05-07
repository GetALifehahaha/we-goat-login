import { Button } from '../'
import { useNavigate } from 'react-router-dom'
import { SearchX } from 'lucide-react';
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-full w-full h-screen bg-linear-to-br from-neutral-800 to-neutral-900 backdrop-blur overflow-hidden
                        flex flex-col justify-center items-center gap-4">
            <SearchX className='text-neutral-700 animate-pulse' size={120} />
            <h1 className='text-8xl font-bold text-white/80'>
                404
            </h1>
            <h5 className='text-neutral-200 '>
                The page that you are looking for does not exist.
            </h5>
            <Button onClick={() => navigate(-1)} text='Go Back' className='mt-8 bg-transparent border border-dashed border-neutral-500 text-neutral-200 hover:text-shadow-none rounded w-fit hover:w-fit px-16' />
        </div>
    )
}

export default NotFound