import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		title: '',
		phone: '',
		password: '',
		password2: '',
		photo: '',
		admin: false,
		skey: process.env.REACT_APP_REGISTRATION_SECRET_KEY,
	});

	const { isLoading } = useSelector((state) => state.auth);

	const { name, title, phone, email, password, password2, photo, admin, skey } =
		formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handlePhoto = (e) => {
		setFormData((prevState) => ({
			...prevState,
			photo: e.target.files[0],
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			const userData = new FormData();
			userData.append('name', name);
			userData.append('title', title);
			userData.append('phone', phone);
			userData.append('email', email.toLowerCase());
			userData.append('password', password);
			userData.append('photo', photo);
			userData.append('admin', admin);
			userData.append('skey', skey);
			dispatch(register(userData))
				.unwrap()
				.then((user) => {
					toast.success(`Registered new user - ${user.name}`);
					navigate('/');
				})
				.catch(toast.error);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='form'>
				<section className='pt-12 pb-8'>
					<h2 className='text-3xl items-center flex'>
						<FaUser className='mr-2' />
						Create your Account
					</h2>
					<p>
						Already have an account? <Link to='/register'>Log In here</Link>
					</p>
				</section>
				<form onSubmit={onSubmit} method='POST' encType='multipart/form-data'>
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
						<input
							type='password'
							className='form-control'
							id='password2'
							name='password2'
							value={password2}
							onChange={onChange}
							placeholder='Confirm password'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='skey'
							name='skey'
							value={skey}
							onChange={onChange}
							placeholder='Enter registration secret key'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='photo'>Your Profile Photo</label>
						<input
							type='file'
							accept='.png, .jpg, .jpeg'
							id='photo'
							name='photo'
							onChange={handlePhoto}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
				<br />
			</section>
		</>
	);
}

export default Register;
