import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createProperty } from '../features/properties/propertySlice'
import BackButton from '../components/BackButton'
import Location from '../components/Location'
import RichTextEditor from "../components/RichTextEdiotor";
import Spinner from '../components/Spinner'


function AddProperty() {

    const { isLoading } = useSelector(
        (state) => state.properties
    )

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reference: 'DUB001',
        category: '',
        type: '',
        bedrooms: 2,
        bathrooms: 2,
        price: 10000,
        size: 1000,
        location: '',
        status: '',
        // geolocation: {
        //     type: "Point",
        //     coordinates: [
        //         55.2793,
        //         25.1973
        //     ]
        // },
        geolocation: [],
        photos: '',
    })


    const { title, description, reference, category, type, bedrooms, bathrooms, price, size, location, status, geolocation, photos } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
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



    const dispatch = useDispatch()
    const navigate = useNavigate()

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

        if (geolocation.length > 0) {
            for (let i = 0; i < geolocation.length; i++) {
                propertyData.append("geolocation", geolocation[i]);
            }
        }

        for (let i = 0; i < photos.length; i++) {
            propertyData.append("photos", photos[i]);
        }
        propertyData.append('status', status);
        dispatch(createProperty(propertyData))
            .unwrap()
            .then(() => {
                navigate('/my-listings')
                toast.success('New property listing was created')
            })
            .catch(toast.error)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='form'>
                <form onSubmit={onSubmit} encType='multipart/form-data'>
                    <BackButton url='/' text='Back' />
                    <h2 className='text-3xl mb-6 items-center flex'>Please fill the form below</h2>
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
                        <RichTextEditor initialValue="" getValue={getValue} />
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
                            <option value=''>Select</option>
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
                            <option value=''>Select</option>
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
                        <label htmlFor='location'>Location</label>
                        <input type='text' name='location' id='location' value={location} onChange={onChange} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Property Status</label>
                        <select
                            name='status'
                            id='status'
                            value={status}
                            onChange={onChange}
                        >
                            <option value='select'>Select</option>
                            <option value='Ready to move'>Ready to move</option>
                            <option value='Offplan'>Offplan</option>
                            <option value='Sold'>Sold</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='photos'>Property Photos</label>
                        <input type="file" multiple accept=".png, .jpg, .jpeg" name="photos" onChange={handlePhotos} />
                    </div>
                    <div className='form-group'>
                        <div className='map-wrapper'>
                            <p><strong>Is the pin in the right location?</strong></p>
                            <p>Type your location in search box. Click and drag the pin to the exact spot.</p>
                            <Location setGeoLocation={setGeoLocation} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
                <br />
            </section>
        </>
    )
}

export default AddProperty