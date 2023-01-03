import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface UserProfile {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
}

interface User {
    loggedIn: boolean
    user: UserProfile | Record<string, never>
}

const initialState: User = {
    loggedIn: false,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true
            state.user = action.payload[0]
        },
        logout: (state) => {
            state.loggedIn = false
            state.user = {}
        }
    }
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
