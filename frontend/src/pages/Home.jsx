import { Link } from 'react-router-dom'
import sale from '../assets/jpg/sale.jpg'
import rent from '../assets/jpg/rent.jpg'

function Home() {
    return (
        <div className='max-w-6xl mx-auto px-4'>
            <h2 className='mt-10 mb-6 text-left text-3xl font-bold'>Find a property</h2>
            <div className="flex items-center justify-end gap-8">
                <div className='w-1/2'>
                    <Link to='/properties/for-sale'>
                        <img src={sale} className="rounded-lg" />
                    </Link>
                    <h1 className='my-3 text-left text-xl'>Properties For Sale</h1>
                </div>
                <div className='w-1/2'>
                    <Link to='/properties/for-rent'>
                        <img src={rent} className="rounded-lg" />
                    </Link>
                    <h1 className='my-3 text-left text-xl'>Properties For Rent</h1>
                </div>
            </div>
        </div>
    )
}

export default Home