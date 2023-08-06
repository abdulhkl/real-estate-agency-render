import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { updateProperty, reset } from '../features/properties/propertySlice'
import BackButton from '../components/BackButton'
import Location from '../components/Location'
import RichTextEditor from "../components/RichTextEdiotor";

function UpdateProperty({ props }) {
    const { property } = useSelector(
        (state) => state.properties
    )

    const propertyInfo = useLocation().state;

    const [formData, setFormData] = useState({
        title: propertyInfo.title,
        description: propertyInfo.description,
        reference: propertyInfo.reference,
        category: propertyInfo.category,
        type: propertyInfo.type,
        bedrooms: propertyInfo.bedrooms,
        bathrooms: propertyInfo.bathrooms,
        price: propertyInfo.price,
        size: propertyInfo.size,
        location: propertyInfo.location,
        status: propertyInfo.status,
        geolocation: [
            propertyInfo.geolocation[0],
            propertyInfo.geolocation[1]
        ],
        photos: propertyInfo.photos,
    })

    const propertyPics = (property?.photos) ? property?.photos : propertyInfo.photos

    const dispatch = useDispatch()
    const params = useParams()
    const { propertyId } = params
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])


    const { title, description, reference, category, type, bedrooms, bathrooms, price, size, location, status, geolocation, photos } = formData


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const handlePhotos = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            photos: e.target.files,
        }))
    }

    const setGeoLocation = (lng, lat) => {
        setFormData((prevState) => ({
            ...prevState,
            geolocation: [lng, lat]
        }))
        console.log(geolocation)
    }

    const [value, setValue] = useState("");
    const getValue = (value) => {
        setValue(value);
        setFormData((prevState) => ({
            ...prevState,
            description: value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const propertyData = new FormData();
        propertyData.append('title', title);
        propertyData.append('description', description);
        propertyData.append('reference', reference);
        propertyData.append('category', category);
        propertyData.append('type', type);
        propertyData.append('bedrooms', bedrooms);
        propertyData.append('bathrooms', bathrooms);
        propertyData.append('price', price);
        propertyData.append('size', size);
        propertyData.append('location', location);

        for (let i = 0; i < geolocation.length; i++) {
            propertyData.append("geolocation", geolocation[i]);
        }

        for (let i = 0; i < photos.length; i++) {
            propertyData.append("photos", photos[i]);
        }
        propertyData.append('status', status);
        dispatch(updateProperty({ propertyData, propertyId }))
            .unwrap()
            .then((data) => {
                toast.success('Listing was updated successfully')
            })
            .catch(toast.error)
    }

    if (!property) {
        return <Spinner />
    }

    return (
        <>
            <section className='form'>
                <BackButton url='/' text='Back' />
                <h2 className='text-3xl mb-6 items-center flex'>Please edit the form below</h2>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title'>Property Title</label>
                        <input type='text' name='title' id='title' value={title} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Property Description</label>
                        {/* <textarea
                            name='description'
                            id='description'
                            className='form-control'
                            placeholder='Description'
                            value={description}
                            onChange={onChange}
                        ></textarea> */}
                        <RichTextEditor initialValue={description} getValue={getValue} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='reference'>Property Reference ID</label>
                        <input type='text' name='reference' id='reference' value={reference} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Category</label>
                        <select
                            name='category'
                            id='category'
                            value={category}
                            onChange={onChange}
                        >
                            <option value='Sale'>Sale</option>
                            <option value='Rent'>Rent</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'>Type</label>
                        <select
                            name='type'
                            id='type'
                            value={type}
                            onChange={onChange}
                        >
                            <option value='Apartment/Flat'>Apartment/Flat</option>
                            <option value='Villa/House'>Villa/House</option>
                            <option value='Townhouse'>Townhouse</option>
                            <option value='Penthouse'>Penthouse</option>
                            <option value='Land'>Land</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price'>Property Price</label>
                        <input type='number' name='price' id='price' value={price} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bedrooms'>No. of Bedrooms</label>
                        <input type='number' name='bedrooms' id='bedrooms' value={bedrooms} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bathrooms'>No. of Bathrooms</label>
                        <input type='number' name='bathrooms' id='bathrooms' value={bathrooms} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='size'>Property Size(sqft)</label>
                        <input type='number' name='size' id='size' value={size} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <div className='map-wrapper'>
                            <label htmlFor='photos'>Property Photos</label>
                            <input type="file" multiple accept=".png, .jpg, .jpeg" name="photos" onChange={handlePhotos} />
                            <div className='flex mt-2'>

                                {(propertyPics.length > 0) && propertyPics.map((photo, index) => (
                                    <img key={index} className='mr-2 h-24' src={photo} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location'>Property Location</label>
                        <select
                            name='location'
                            id='location'
                            value={location}
                            onChange={onChange}
                        >
                            <option value='Al Barsha'>Al Barsha</option>
                            <option value='Naif'>Naif</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Property Status</label>
                        <select
                            name='status'
                            id='status'
                            value={status}
                            onChange={onChange}
                        >
                            <option value='Ready to move'>Ready to move</option>
                            <option value='Offplan'>Offplan</option>
                            <option value='Sold'>Sold</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <div className='map-wrapper'>
                            <p><strong>Is the pin in the right location?</strong></p>
                            <p>Type your location in search box. Click and drag the pin to the exact spot.</p>
                            <Location setGeoLocation={setGeoLocation} selectedPos={formData.geolocation} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default UpdateProperty