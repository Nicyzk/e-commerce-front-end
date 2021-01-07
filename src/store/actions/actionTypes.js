const authActionTypes = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_REQUEST: "LOGOUT_REQUEST",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE"
}


const categoryActionTypes = {
    GET_ALL_CATEGORIES_REQUEST: "GET_ALL_CATEGORIES_REQUEST",
    GET_ALL_CATEGORIES_SUCCESS: "GET_ALL_CATEGORIES_SUCCESS",
    GET_ALL_CATEGORIES_FAILURE: "GET_ALL_CATEGORIES_FAILURE"
}


const productActionTypes = {
    GET_PRODUCTS_BY_SLUG_REQUEST: "GET_PRODUCTS_BY_SLUG_REQUEST",
    GET_PRODUCTS_BY_SLUG_SUCCESS: "GET_PRODUCTS_BY_SLUG_SUCCESS",
    GET_PRODUCTS_BY_SLUG_FAILURE: "GET_PRODUCTS_BY_SLUG_FAILURE",
    GET_PRODUCT_PAGE_REQUEST: "GET_PRODUCT_PAGE_REQUEST",
    GET_PRODUCT_PAGE_SUCCESS: "GET_PRODUCT_PAGE_SUCCESS",
    GET_PRODUCT_PAGE_FAILURE: "GET_PRODUCT_PAGE_FAILURE",
    GET_PRODUCT_DETAILS_BY_ID_REQUEST: "GET_PRODUCT_DETAILS_BY_ID_REQUEST",
    GET_PRODUCT_DETAILS_BY_ID_SUCCESS: "GET_PRODUCT_DETAILS_BY_ID_SUCCESS",
    GET_PRODUCT_DETAILS_BY_ID_FAILURE: "GET_PRODUCT_DETAILS_BY_ID_FAILURE"
}

const cartActionTypes = {
    ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
    ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
    ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
    GET_CART_REQUEST: "GET_CART_REQUEST",
    GET_CART_SUCCESS: "GET_CART_SUCCESS",
    GET_CART_FAILURE: "GET_CART_FAILURE",
    RESET_CART_STATE: "RESET_CART_STATE"
}

const userActionTypes = {
    ADD_ADDRESS_REQUEST: "ADD_ADDRESS_REQUEST",
    ADD_ADDRESS_SUCCESS: "ADD_ADDRESS_SUCCESS",
    ADD_ADDRESS_FAILURE: "ADD_ADDRESS_FAILURE",
    GET_ADDRESS_REQUEST: "GET_ADDRESS_REQUEST",
    GET_ADDRESS_SUCCESS: "GET_ADDRESS_SUCCESS",
    GET_ADDRESS_FAILURE: "GET_ADDRESS_FAILURE",
    ADD_ORDER_REQUEST: "ADD_ORDER_REQUEST",
    ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
    ADD_ORDER_FAILURE: "ADD_ORDER_FAILURE",
    GET_ORDERS_REQUEST: "GET_ORDERS_REQUEST",
    GET_ORDERS_SUCCESS: "GET_ORDERS_SUCCESS",
    GET_ORDERS_FAILURE: "GET_ORDERS_FAILURE"
}

export { authActionTypes, categoryActionTypes, productActionTypes, cartActionTypes, userActionTypes }