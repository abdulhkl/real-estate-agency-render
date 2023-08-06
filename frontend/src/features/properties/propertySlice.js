import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertyService from './propertyService'
import { extractErrorMessage } from '../../utils'


const initialState = {
    properties: [],
    property: {},
    isDeleted: false,
    isLoading: false,
}

// Create new property
export const createProperty = createAsyncThunk(
    'properties/create',
    async (propertyData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await propertyService.createProperty(propertyData, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Update property
export const updateProperty = createAsyncThunk(
    'properties/update',
    async ({ propertyData, propertyId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await propertyService.updateProperty(propertyData, propertyId, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)


// Get all user property
export const getUserProperties = createAsyncThunk(
    'properties/user',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await propertyService.getUserProperties(token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Get all user property
export const getPropertiesForSale = createAsyncThunk(
    'properties/sale',
    async (_, thunkAPI) => {
        try {
            return await propertyService.getPropertiesForSale()
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Get all properties for rent
export const getPropertiesForRent = createAsyncThunk(
    'properties/rent',
    async (_, thunkAPI) => {
        try {
            return await propertyService.getPropertiesForRent()
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)



// Delete property
export const deleteProperty = createAsyncThunk(
    'properties/delete',
    async (propertyId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await propertyService.deleteProperty(propertyId, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Get user property
export const getProperty = createAsyncThunk(
    'properties/get',
    async (propertyId, thunkAPI) => {
        try {
            return await propertyService.getProperty(propertyId)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProperty.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProperty.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(createProperty.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updateProperty.pending, (state) => {
                state.property = null
            })
            .addCase(updateProperty.fulfilled, (state, action) => {
                state.property = action.payload
            })
            .addCase(getUserProperties.pending, (state) => {
                state.properties = null
            })
            .addCase(getUserProperties.fulfilled, (state, action) => {
                state.properties = action.payload
            })
            .addCase(getUserProperties.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(getPropertiesForSale.pending, (state) => {
                state.properties = null
            })
            .addCase(getPropertiesForSale.fulfilled, (state, action) => {
                state.properties = action.payload
            })
            .addCase(getPropertiesForRent.pending, (state) => {
                state.properties = null
            })
            .addCase(getPropertiesForRent.fulfilled, (state, action) => {
                state.properties = action.payload
            })
            .addCase(getProperty.fulfilled, (state, action) => {
                state.property = action.payload
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.isDeleted = true
            })
    }
})

export const { reset } = propertySlice.actions
export default propertySlice.reducer