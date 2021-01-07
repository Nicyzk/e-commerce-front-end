import { categoryActionTypes } from '../../actions/actionTypes'

const initialState = {
    loading: false,
    message: '',
    error: null,
    categories: []
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case categoryActionTypes.GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
        case categoryActionTypes.GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default: return state
    }
}

export default reducer