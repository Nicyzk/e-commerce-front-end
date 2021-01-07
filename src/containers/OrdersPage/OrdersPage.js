import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../store/actions/userActions'
import Layout from '../../components/Layout/Layout'
import classes from './OrdersPage.module.css'

const OrderPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    console.log(user.orders)

    if (!auth.authenticated) {
        return <div>Please sign in to view your orders</div>
    }
    return (
        <Layout>
            <div className={classes.pageContent}>
                {user.orders.map((order, index) => {
                    return order.items.map((product, index) => {
                        return (
                            <div className={"card " + classes.orderCard}>
                                <div></div>
                                <div></div>
                                <div></div>
                                {product.productId.productPictures[0].img}
                            </div>
                        )
                    })
                })}
                
            </div>
        </Layout>
    )
}

export default OrderPage