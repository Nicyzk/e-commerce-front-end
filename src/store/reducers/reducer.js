import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import categoryReducer from './reducers/category'
import productsReducer from './reducers/products'
import cartReducer from './reducers/cart'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userReducer
})
export default rootReducer