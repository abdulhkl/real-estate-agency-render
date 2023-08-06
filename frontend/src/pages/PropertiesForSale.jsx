import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPropertiesForSale, reset } from '../features/properties/propertySlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PropertyItem from '../components/PropertyItem'

function PropertiesForRent() {
    const { properties, isDeleted } = useSelector(
        (state) => state.properties
    )

    const dispatch = useDispatch()

    useEffect(() => {
        if (isDeleted) {
            dispatch(getPropertiesForSale())
            dispatch(reset())
        }
    }, [dispatch, isDeleted])

    useEffect(() => {
        dispatch(getPropertiesForSale())
    }, [dispatch])

    if (!properties) {
        return <Spinner />
    }

    return (
        <div className='bg-slate-50 py-10 h-full'>
            <div className='max-w-6xl mx-auto px-4'>
                <BackButton url='/' text='Back' />
                <h2 className='text-3xl items-center flex'>Properties for Sale</h2>
                <div className="tickets">
                    {properties.map((property) => (
                        <PropertyItem key={property._id} property={property} />
                    ))}
                </div>
                {properties <= 0 && (
                    <p className='text-center mt-10 text-xl'>
                        No properties were found
                    </p>
                )}
            </div>
        </div>
    )
}

export default PropertiesForRent