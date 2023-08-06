import { FaSignInAlt, FaSignOutAlt, FaList, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        toast.success(`You are logged out`)
    }

    return (
        <>
            <header>
                <div className="px-4 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-2 sm:gap-0">

                    <h1 className="text-3xl font-bold uppercase text-slate-700 mb-0">
                        <Link to='/'>Real Estate</Link>
                    </h1>



                    <ul className="flex items-center justify-end gap-8">
                        {user ? (
                            <>
                                <li>
                                    <Link to='/profile' className='flex leading-5 items-center'>
                                        <FaUser className='mr-1' /> My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/my-listings' className='flex leading-5 items-center'>
                                        <FaList className='mr-1' /> My Listing
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={onLogout} to='/login' className='flex leading-5 items-center'>
                                        <FaSignOutAlt className='mr-1' /> Logout
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/add-property' className="inline-flex items-center justify-center px-6 py-2 text-base font-small leading-5 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">
                                        Add Property
                                    </Link>

                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to='/login' className='flex items-center'>
                                        <FaSignInAlt className='mr-1' /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register' className='flex items-center'>
                                        <FaUser className='mr-1' /> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>



                </div>
            </header>

        </>
    )
}

export default Header