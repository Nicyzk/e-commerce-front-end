import { cartActionTypes } from '../../actions/actionTypes'
const initialState = {
    cartItems: {},
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case cartActionTypes.ADD_TO_CART_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cartActionTypes.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload.cartItems
            }
        case cartActionTypes.ADD_TO_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case cartActionTypes.GET_CART_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cartActionTypes.GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload.cartItems
            }
        case cartActionTypes.GET_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case cartActionTypes.RESET_CART_STATE:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer