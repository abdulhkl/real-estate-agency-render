import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function PropertiesForRent() {

    const [changeDetails, setChangeDetails] = useState(false)

    const { user, isLoading } = useSelector(
        (state) => state.auth
    )

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        title: user.title,
        phone: user.phone,
        photo: user.photo,
        admin: false,
    })

    const { name, title, phone, email, photo } = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handlePhoto = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            photo: e.target.files[0]
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setChangeDetails((prevState) => !prevState)
        const user = new FormData();
        user.append('name', name);
        user.append('title', title);
        user.append('phone', phone);
        user.append('email', email.toLowerCase());
        user.append('photo', photo);
        dispatch(updateUser(user))
            .unwrap(user)
            .then((user) => {
                toast.success("Profile was updated successfully")
            })
            .catch(toast.error)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='bg-slate-50 py-10 h-full'>
            {(user) && (
                <div className='max-w-3xl mx-auto px-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-3xl items-center flex'>Profile</h2>
                        <a className='changePersonalDetails bg-blue-600 text-sm hover:bg-blue-700 text-white py-1 px-4 rounded-full'
                            onClick={() => {
                                setChangeDetails((prevState) => !prevState)
                            }}>
                            {changeDetails ? 'Cancel' : 'Edit Profile'}
                        </a>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <div className="flex items-center profile-card my-10 w-full flex-col md:flex-row bg-white shadow-lg text-left">
                                <div className='md:w-1/3'>
                                    <img className='user-photo mx-auto my-auto' src={user.photo} />
                                </div>
                                <div className="p-5 pr-10 md:w-2/3">
                                    <form onSubmit={onSubmit} method='POST' encType='multipart/form-data' className={!changeDetails ? 'formInActive' : 'formActive'}>
                                        <h2>Welcome Back,</h2>
                                        <div className='form-group'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='name'
                                                name='name'
                                                value={name}
                                                onChange={onChange}
                                                placeholder='Enter your name'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='title'
                                                name='title'
                                                value={title}
                                                onChange={onChange}
                                                placeholder='Enter your title'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='phone'
                                                name='phone'
                                                value={phone}
                                                onChange={onChange}
                                                placeholder='Enter your phone'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                type='email'
                                                className='form-control'
                                                id='email'
                                                name='email'
                                                value={email}
                                                onChange={onChange}
                                                placeholder='Enter your email'
                                                required
                                            />
                                        </div>
                                        <div className='form-group in-active'>
                                            <label htmlFor='photo'>Your Profile Photo</label>
                                            <input type="file" accept=".png, .jpg, .jpeg" id='photo' name="photo" onChange={handlePhoto} />
                                        </div>
                                        <div className='form-group in-active'>
                                            <button className='btn btn-block'>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PropertiesForRent