import { cartActionTypes } from '../actions/actionTypes'
import axios from '../../helpers/axios'
import store from '../store'

const getCart = () => {
    return async dispatch => {
        dispatch({
            type: cartActionTypes.GET_CART_REQUEST
        })
        try {
            const res = await axios.get('/cart/getcart')
            if (res.status === 200) {
                const { cartItems } = res.data
                dispatch({
                    type: cartActionTypes.GET_CART_SUCCESS,
                    payload: {
                        cartItems
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: cartActionTypes.GET_CART_FAILURE,
                payload: {
                    error
                }
            })
        }
    }
}

//only for adding one item at a time - for now
const addToCart = (product, amt = null) => {
    const { _id, name, price, img } = product
    const auth = store.getState().auth
    return async dispatch => {
        //if logged in
        if (auth.authenticated) {
            const payload = {
                cartItems: [
                    {
                        productId: _id,
                        quantity: amt
                    }
                ]
            }
            const res = await axios.post('/cart/add-to-cart', payload)
            if (res.status === 200) {
                dispatch(getCart())
            }
        } else {
            //if not logged in - okay!
            const { cartItems } = store.getState().cart
            const qty = cartItems[_id] ? cartItems[_id].qty + amt : 1
            cartItems[_id] = {
                _id,
                name,
                price,
                img,
                qty
            }
            localStorage.setItem('cart', JSON.stringify(cartItems))
            dispatch({
                type: cartActionTypes.ADD_TO_CART_SUCCESS,
                payload: {
                    cartItems
                }
            })
        }
    }
}

//on page reloads/on login
const updateCart = () => {
    return async dispatch => {
        const auth = store.getState().auth
        const cart = store.getState().cart

        //if logged in, you must depend on DB not local storage for persistent storage.
        if (auth.authenticated) {
            localStorage.removeItem('cart')
            const payload = {
                cartItems: Object.keys(cart.cartItems).map(key => {
                    return {
                        productId: key,
                        quantity: cart.cartItems[key].qty
                    }
                })
            }
            const res = await axios.post('/cart/add-to-cart', payload)
            if (res.status === 200) {
                dispatch(getCart())
            }
        } else {
            //not logged in - okay!
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null
            if (cart) {
                dispatch({
                    type: cartActionTypes.ADD_TO_CART_SUCCESS,
                    payload: {
                        cartItems: cart
                    }
                })
            }
        }
    }
}

export { getCart, addToCart, updateCart }