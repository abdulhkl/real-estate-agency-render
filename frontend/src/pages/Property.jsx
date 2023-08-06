import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProperty, reset } from '../features/properties/propertySlice'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import sizeIcon from '../assets/svg/sizeIcon.svg'
import phoneIcon from '../assets/svg/phoneIcon.svg'
import emailIcon from '../assets/svg/emailIcon.svg'
import { useLoadScript } from "@react-google-maps/api";
import Map from '../components/Map'
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';



function Property() {
    const { property } = useSelector(
        (state) => state.properties
    )

    const dispatch = useDispatch()
    const { propertyId } = useParams()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GEOCODE_API_KEY,
    });

    useEffect(() => {
        dispatch(getProperty(propertyId)).unwrap().catch(toast.error)
        // eslint-disable-next-line
    }, [propertyId, dispatch])

    if (!property) {
        return <Spinner />
    }

    if (property.message) {
        return <h3>Something Went Wrong</h3>
    }

    return (
        <div className='bg-slate-50'>
            {(property && property.length > 0) &&
                <>
                    <div className='carousel'>
                        {(property[0].photos?.length > 0) && (
                            <Swiper
                                modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                                slidesPerView={1} autoplay navigation pagination={{ clickable: true }}>
                                {property[0].photos.map((url, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            style={{
                                                background: `url(${property[0].photos[index]}) center no-repeat`,
                                                backgroundSize: 'cover',
                                                height: 500,
                                            }}
                                            className='swiperSlideDiv'
                                        ></div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    <div className='max-w-6xl mx-auto mb-10'>
                        <div className="flex flex-row flex-wrap">
                            <aside className={`w-full z-50 sm:w-1/3 md:w-1/3 ${(property[0].photos?.length > 0) ? 'mt-[-100px]' : 'mt-10'}`} >
                                <div className="sticky p-10 top-0 bg-white rounded-xl w-full">
                                    <BackButton url='/' text='Back to listing' />
                                    <ul className="nav flex text-left property-info leading-10 flex-col overflow-hidden">
                                        <li><h1 className="text-gray-800 font-extra-bold dark:text-white text-3xl font-medium mb-2">{property[0].title}</h1></li>
                                        <li>{property[0].location}</li>
                                        <li className='flex'><span className='w-1/4 flex'><img src={bedIcon} className='mr-2 w-6' alt='bed' /> {property[0].bedrooms}</span><span className='w-1/4 flex'><img src={bathtubIcon} className='mr-2 w-6' alt='bath' /> {property[0].bathrooms}</span><span className='w-2/4 flex'><img src={sizeIcon} className='mr-2 w-5' alt='bed' /> {property[0].size}{' sqft'}</span></li>
                                        {/* <li className='text-blue-800 font-medium text-xl'>AED {(property[0].price).toLocaleString(undefined, { maximumFractionDigits: 2 })}{property[0].category === 'Rent' && '/year'}</li> */}
                                        <li>Ref. No: {property[0].reference}</li>
                                    </ul>
                                    <hr className='my-6' />
                                    <div className='flex agent-info'>
                                        <div><img src={property[0].user[0].photo} /></div>
                                        <ul className="nav flex text-left leading-10 flex-col overflow-hidden">
                                            <li className='text-blue-800 font-medium text-xl'>{property[0].user[0].name}</li>
                                            <li className='text-sm'>{property[0].user[0].title}</li>
                                            <li className='flex'><img src={phoneIcon} className='mr-2 w-5' alt='bed' /> {property[0].user[0].phone}</li>
                                            <li className='flex'><img src={emailIcon} className='mr-2 w-5' alt='bed' /> {property[0].user[0].email}</li>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                            <main role="main" className="w-full text-left sm:w-2/3 md:w-2/3 p-12">
                                <h1 className="text-2xl" id="home">Description</h1>
                                <div className='description' dangerouslySetInnerHTML={{ __html: property[0].description }}>

                                </div>
                            </main>
                        </div>
                    </div>
                    <div>
                        {(isLoaded && property[0].geolocation.length > 0) && (
                            <Map key={property[0]._id} photo={property[0].photos[0]} title={property[0].title} location={property[0].location} lat={+property[0].geolocation[1]} lng={+property[0].geolocation[0]} />
                        )}
                    </div>
                </>

            }

        </div >
    )
}

export default Property