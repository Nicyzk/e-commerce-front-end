import axios from '../../helpers/axios'
import { productActionTypes } from './actionTypes'

const getProductsBySlug = (slug) => {
    return async dispatch => {
        dispatch({
            type: productActionTypes.GET_PRODUCTS_BY_SLUG_REQUEST
        })
        const res = await axios.get(`/product/getproducts/${slug}`)
        if (res.status === 200) {
            console.log(res.data)
            dispatch({
                type: productActionTypes.GET_PRODUCTS_BY_SLUG_SUCCESS,
                payload: res.data
            })
        } else {
            // dispatch({
            //     type: productActionTypes.GET_PRODUCTS_BY_SLUG_FAILURE,
            //     error: res.data.error
            // })
        }
    }
}

const getProductPage = (payload) => {
    return async dispatch => {
        const { category, type } = payload
        dispatch({
            type: productActionTypes.GET_PRODUCT_PAGE_REQUEST
        })
        try {
            const res = await axios.get(`/page/getpage/${category}/${type}`)
            if (res.status === 200) {
                const { page } = res.data
                    dispatch({
                        type: productActionTypes.GET_PRODUCT_PAGE_SUCCESS,
                        payload: {
                            page
                        }
                    })
            }
        } catch (error) {
            dispatch({
                type: productActionTypes.GET_PRODUCT_PAGE_FAILURE,
                payload: {
                    error
                }
            })
        }
    }
}

const getProductDetailsById = (id) => {
    return async dispatch => {
        dispatch({
            type: productActionTypes.GET_PRODUCT_DETAILS_BY_ID_REQUEST
        })
        let res
        try {
            res = await axios.get(`/product/getproductdetails/${id}`)
            const { product } = res.data
            dispatch({
                type: productActionTypes.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: {
                    productDetails: product
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: productActionTypes.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }


    }
}

export { getProductsBySlug, getProductPage, getProductDetailsById }