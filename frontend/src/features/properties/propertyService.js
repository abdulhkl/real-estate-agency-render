import axios from 'axios'

const API_URL = '/api/properties/'

// Create New Property
const createProperty = async (propertyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, propertyData, config)
    return response.data
}

// Update user Property
const updateProperty = async (propertyData, propertyId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // for (var pair of propertyData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    const response = await axios.put(API_URL + propertyId, propertyData, config)
    return response.data
}

// Get All Users Property
const getUserProperties = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'user', config)
    return response.data
}

// Get All Users Property
const getPropertiesForSale = async () => {

    const response = await axios.get(API_URL + 'sale')
    return response.data
}

// Get All Property for Rent
const getPropertiesForRent = async () => {

    const response = await axios.get(API_URL + 'rent')
    return response.data
}



// Get user Property
const getProperty = async (propertyId) => {
    const response = await axios.get(API_URL + propertyId)
    return response.data
}

// Delete Property
const deleteProperty = async (prorpertyId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + prorpertyId, config)
    return response.data
}


const propertyService = {
    createProperty,
    updateProperty,
    getUserProperties,
    getPropertiesForSale,
    getPropertiesForRent,
    getProperty,
    deleteProperty
}

export default propertyService