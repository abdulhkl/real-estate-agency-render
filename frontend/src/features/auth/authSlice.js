import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from '../../utils'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isAdmin: user ? user.admin : false,
}

// Register new user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

// Update property
export const updateUser = createAsyncThunk(
    'auth/update',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.updateUser(user, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)



// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Logout user
export const logout = createAction('auth/logout', () => {
    authService.logout()
    // return an empty object as our payload as we don't need a payload but the
    // prepare function requires a payload return
    return {}
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState,
        logout: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                if (state.user.admin === true) {
                    state.isAdmin = true
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer