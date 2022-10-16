import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { username: null, token: null , refreshToken: null},
    reducers: {
        setCredentials: (state, action) => {
            const { username, token , refreshToken } = action.payload
            state.username = username
            state.token = token
            state.refreshToken = refreshToken
            localStorage.setItem("user" , JSON.stringify({
                username: action.payload.username,
                token: action.payload.token,
                refreshToken : action.payload.refreshToken,
        }))
        },
        logOut: (state, action) => {
            state.username = null
            state.token = null
            localStorage.removeItem("user")
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentusername = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.token