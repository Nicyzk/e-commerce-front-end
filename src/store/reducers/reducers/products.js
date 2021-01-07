import { productActionTypes } from '../../actions/actionTypes'

const initialState = {
    products: [],
    productsByPrice: {
        under500: [],
        under1000: [],
        under1500: [],
        under2000: [],
        under2500: []
    },
    loading: false,
    page: {},
    error: null,
    productDetails: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case productActionTypes.GET_PRODUCTS_BY_SLUG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productActionTypes.GET_PRODUCTS_BY_SLUG_SUCCESS:
            return {
                ...state,
                products: {
                    ...action.payload.products
                },
                productsByPrice: {
                    ...action.payload.productsByPrice
                },
                loading: false
            }
        case productActionTypes.GET_PRODUCTS_BY_SLUG_FAILURE:
            return {
                ...state,
                loading: false
            }
        case productActionTypes.GET_PRODUCT_PAGE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productActionTypes.GET_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                page: action.payload.page
            }
        case productActionTypes.GET_PRODUCT_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case productActionTypes.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productActionTypes.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails
            }
        case productActionTypes.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}

export default reducer