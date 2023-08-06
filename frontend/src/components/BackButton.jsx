import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BackButton = ({ url, text }) => {
    return (
        <Link to={url} className='flex items-center gap-2 text-slate-500 mb-5 '>
            <FaArrowCircleLeft /> {text}
        </Link>
    )
}

export default BackButton