import { createSlice } from '@reduxjs/toolkit'

const initialState = { isAuth: false }

const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus(state, action) {
      state.isAuth=action.payload
    }
  },
})

export const { changeAuthStatus } = AuthReducer.actions
export default AuthReducer.reducer
