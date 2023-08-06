import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProperties, reset } from '../features/properties/propertySlice'
import Spinner from '../components/Spinner'
import PropertyItem from '../components/UserPropertyItem'


function MyListings() {
    const { properties, isDeleted } = useSelector(
        (state) => state.properties
    )

    const dispatch = useDispatch()

    useEffect(() => {
        if (isDeleted) {
            dispatch(getUserProperties())
            dispatch(reset())
        }
    }, [dispatch, isDeleted])

    useEffect(() => {
        dispatch(getUserProperties())
    }, [dispatch])


    if (!properties) {
        return <Spinner />
    }

    return (
        <div className='bg-slate-50 py-10 flex-grow'>
            <div className='max-w-6xl mx-auto px-4'>
                <h2 className='text-3xl items-center flex'>My property listing</h2>
                <div className="tickets">
                    {properties.map((property) => (
                        <PropertyItem key={property._id} property={property} />
                    ))}
                </div>
                {properties <= 0 && (
                    <p className='text-center text-xl mt-10'>
                        No properties were found
                    </p>
                )}
            </div>
        </div>
    )
}

export default MyListings