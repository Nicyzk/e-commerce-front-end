import { userActionTypes } from '../../actions/actionTypes'

const initialState = {
    address: [],
    orders: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActionTypes.GET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload.address
            }
        case userActionTypes.GET_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage
            }
        case userActionTypes.ADD_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActionTypes.ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload.address
            }
        case userActionTypes.ADD_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage
            }
        case userActionTypes.ADD_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActionTypes.ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload.order
            }
        case userActionTypes.ADD_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage
            }
        case userActionTypes.GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActionTypes.GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders
            }
        case userActionTypes.GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage
            }

        default: return state
    }
}

export default reducer