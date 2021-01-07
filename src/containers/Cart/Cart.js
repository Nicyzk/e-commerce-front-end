import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import classes from './Cart.module.css'
import CartItem from './components/CartItem/CartItem'
import { addToCart } from '../../store/actions/cartActions'

const Cart = (props) => {
    const cart = useSelector(state => state.cart)
    const [cartItems, setCartItems] = useState(cart.cartItems)
    const dispatch = useDispatch()

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems])

    const onQuantityInc = (cartItem) => {
        const { _id, name, price, img } = cartItem
        dispatch(addToCart({ _id, name, price, img }, 1))
        //line 20 updates local storage in case of page reload and redux state. Due to useEffect, change in redux state
        //will cause updating of container state
    }

    const onQuantityDec = (cartItem) => {
        if (cartItem.qty <= 1) {
            return
        }
        const { _id, name, price, img } = cartItem
        dispatch(addToCart({ _id, name, price, img }, -1))
    }

    const numberOfItems = Object.keys(cart.cartItems).reduce((totalNumber, currentKey) => {
        return totalNumber + cart.cartItems[currentKey].qty
    }, 0)
    const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, currentKey) => {
        return totalPrice + cart.cartItems[currentKey].price * cart.cartItems[currentKey].qty
    }, 0)

    if (props.onlyCartItems) {
        return (
            <>
                {Object.keys(cartItems).map((key, index) => {
                    return (
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={() => onQuantityInc(cartItems[key])}
                            onQuantityDec={() => onQuantityDec(cartItems[key])}
                        />
                    )
                })}
            </>
        )
    }
    return (
        <Layout>
            <div className={classes.pageContent}>
                <div className={classes.leftContainer}>
                    <div className={classes.cartContainer}>
                        <div className={classes.containerHeader}>My Cart</div>
                        {Object.keys(cartItems).map((key, index) => {
                            return (
                                <CartItem
                                    key={index}
                                    cartItem={cartItems[key]}
                                    onQuantityInc={() => onQuantityInc(cartItems[key])}
                                    onQuantityDec={() => onQuantityDec(cartItems[key])}
                                />
                            )
                        })}
                    </div>
                    <Link to="/checkout"><button className={'button-blue ' + classes.checkoutBtn}>Checkout</button></Link>
                </div>
                <div className={classes.priceContainer + ' card'}>
                    <div style={{ color: "#888" }} className={classes.containerHeader}>Price Details</div>
                    <div className={classes.priceDetailsBody}>
                        <div className={classes.priceDetailsRow}><span>Price ({numberOfItems} items)</span><span>${totalPrice}</span></div>
                        <div className={classes.priceDetailsRow}><span>Delivery Charges</span><span>FREE</span></div>
                        <div className={classes.priceDetailsRow}><span>Total</span><span>${totalPrice}</span></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart