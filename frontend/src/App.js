import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import AddProperty from './pages/AddProperty'
import UpdateProperty from './pages/UpdateProperty'
import Profile from './pages/Profile'
import MyListings from './pages/MyListings'
import PropertiesForRent from './pages/PropertiesForRent'
import PropertiesForSale from './pages/PropertiesForSale'
import Property from './pages/Property'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-property' element={<PrivateRoute />}>
            <Route path='/add-property' element={<AddProperty />} />
          </Route>
          <Route path='/property/update/:propertyId' element={<PrivateRoute />}>
            <Route path='/property/update/:propertyId' element={<UpdateProperty />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/my-listings' element={<PrivateRoute />}>
            <Route path='/my-listings' element={<MyListings />} />
          </Route>
          <Route path='/properties/for-rent' element={<PropertiesForRent />} />
          <Route path='/properties/for-sale' element={<PropertiesForSale />} />
          <Route path='/property/:propertyId' element={<Property />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
