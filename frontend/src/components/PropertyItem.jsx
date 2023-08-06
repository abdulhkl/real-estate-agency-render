import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProperty } from '../features/properties/propertySlice'
import { toast } from 'react-toastify'

function PropertyItem({ property }) {

    const { isDeleted } = useSelector(
        (state) => state.properties
    )

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()



    const onDeleteProperty = (propertyId) => {
        dispatch(deleteProperty(propertyId))
            .unwrap()
            .then(() => {
                toast.success('Property listing Deleted')
            })
            .catch(toast.error)
    }

    const itemPhoto = (property.photos.length > 0 ? property.photos[0] : 'https://real-estate-agency-app.s3.ap-south-1.amazonaws.com/properties/no-image.png')
    return (
        <div>
            <div className="flex justify-center">
                <div className="flex my-10 w-full flex-col md:flex-row bg-white shadow-lg text-left">
                    <div className='md:w-1/2'>
                        <Link to={`/property/${property._id}`}>
                            <img className="w-full h-96 min-h-full object-cover" src={itemPhoto} alt="" />
                        </Link>
                    </div>
                    <div className="p-10 mt-2 md:w-1/2">
                        <h2 className="text-gray-900 text-2xl font-semibold mb-2">{property.title}</h2>
                        <ul className='desc-list'>
                            <li className='flex'>
                                <span className='w-4/12'>Price</span>
                                <span className='text-blue-600 font-semibold'>AED {(property.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}{property.category === 'Rent' && '/year'}</span>
                            </li>
                            <li className='flex'>
                                <span className='w-4/12'>Location</span>
                                <span>{property.location}</span>
                            </li>
                            <li className='flex'>
                                <span className='w-4/12'>Size</span>
                                <span>{property.size}sqft</span>
                            </li>
                            <li className='flex'>
                                <span className='w-4/12'>Bedrooms</span>
                                <span>{property.bedrooms}</span>
                            </li>
                            <li className='flex'>
                                <span className='w-4/12'>Bathrooms</span>
                                <span>{property.bathrooms}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyItem