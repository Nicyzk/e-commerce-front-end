import { userActionTypes, cartActionTypes } from './actionTypes'
import axios from '../../helpers/axios'
import { BiError } from 'react-icons/bi'

const addAddress = (address) => {
    return async dispatch => {
        const payload = {
            address
        }
        let res
        try {
            dispatch({
                type: userActionTypes.ADD_ADDRESS_REQUEST
            })
            res = await axios.post('/address/addaddress', payload)
            if (res.status === 200) {
                const address = res.data.userAddress.address
                dispatch({
                    type: userActionTypes.ADD_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            }
        } catch (err) {
            console.log(err)
            dispatch({
                type: userActionTypes.ADD_ADDRESS_FAILURE,
                payload: {
                    errorMessage: err
                }
            })
        }
    }
}

const editAddress = (address) => {
    return async dispatch => {
        const payload = {
            address
        }
        let res
        try {
            dispatch({
                type: userActionTypes.ADD_ADDRESS_REQUEST
            })
            res = await axios.post('/address/editaddress', payload)
            if (res.status === 200) {
                const address = res.data.userAddress.address
                dispatch({
                    type: userActionTypes.ADD_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            }
        } catch (err) {
            console.log(err)
            dispatch({
                type: userActionTypes.ADD_ADDRESS_FAILURE,
                payload: {
                    errorMessage: err
                }
            })
        }
    }
}

const getAddress = () => {
    return async dispatch => {
        let res
        try {
            dispatch({
                type: userActionTypes.GET_ADDRESS_REQUEST
            })
            res = await axios.get('/address/getaddress')
            if (res.status === 200) {
                if (!res.data.userAddress) {
                    return dispatch({
                        type: userActionTypes.GET_ADDRESS_SUCCESS,
                        payload: {
                            address: []
                        }
                    })
                }
                const address = res.data.userAddress.address
                dispatch({
                    type: userActionTypes.GET_ADDRESS_SUCCESS,
                    payload: {
                        address
                    }
                })
            }
        } catch (err) {
            const { errorMessage } = res.data
            dispatch({
                type: userActionTypes.GET_ADDRESS_FAILURE,
                payload: {
                    errorMessage
                }
            })
        }
    }
}

const addOrder = (payload) => {
    return async dispatch => {
        let res
        try {
            dispatch({
                type: userActionTypes.ADD_ORDER_REQUEST
            })
            res = await axios.post('/order/addorder', payload)
            if (res.status === 200) {
                dispatch({
                    type: cartActionTypes.RESET_CART_STATE
                })
                const order = res.data.order
                dispatch({
                    type: userActionTypes.ADD_ORDER_SUCCESS,
                    payload: {
                        order
                    }
                })
            }
        } catch (err) {
            console.log(err)
            dispatch({
                type: userActionTypes.ADD_ORDER_FAILURE,
                payload: {
                    errorMessage: err
                }
            })
        }
    }
}

const getOrders = () => {
    return async dispatch => {
        let res
        try {
            dispatch({
                type: userActionTypes.GET_ORDERS_REQUEST
            })
            res = await axios.get('/order/getorders')
            if (res.status === 200) {
                const { orders } = res.data
                console.log(orders)
                dispatch({
                    type: userActionTypes.GET_ORDERS_SUCCESS,
                    payload: {
                        orders
                    }
                })
            }
        } catch (err) {
            console.log(err)
            dispatch({
                type: userActionTypes.GET_ORDERS_FAILURE,
                payload: {
                    error: err
                }
            })
        }
    }
}

export { addAddress, getAddress, editAddress, addOrder, getOrders }
