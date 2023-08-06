import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
            .unwrap()
            .then((user) => {
                toast.success(`Logged in as ${user.name}`)
                navigate('/')
            })
            .catch(toast.error)
    }

    return (
        <>

            <section className='form'>
                <section className='pt-12 pb-8'>
                    <h2 className='text-3xl items-center flex'><FaSignInAlt className='mr-2' />Log in to your account</h2>
                    <p>Don't have an account yet? <Link to='/register'>Register here</Link></p>
                </section>
                <form onSubmit={onSubmit}>
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
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login