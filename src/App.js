import './App.css';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import ProductListPage from './containers/ProductListPage/ProductListPage'
import ProductDetailsPage from './containers/ProductDetailsPage/ProductDetailsPage'
import CheckoutPage from './containers/CheckoutPage/CheckoutPage'
import Cart from './containers/Cart/Cart'
import OrdersPage from './containers/OrdersPage/OrdersPage'
import { getAllCategories } from './store/actions/categoryActions'
import { isUserLoggedIn } from './store/actions/authActions'
import { updateCart } from './store/actions/cartActions'

function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    dispatch(updateCart())
  }, [auth.authenticated]) 

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products/:slug" component={ProductListPage}/>
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage}/>
          <Route path="/" component={() => <h1>Page Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
