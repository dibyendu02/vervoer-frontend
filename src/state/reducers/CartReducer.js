import { createSlice } from '@reduxjs/toolkit'

const initialState = { cartList: [] }

const CartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action) {
            state.cartList = action.payload
        }
    },
})

export const { setCart } = CartReducer.actions
export default CartReducer.reducer
