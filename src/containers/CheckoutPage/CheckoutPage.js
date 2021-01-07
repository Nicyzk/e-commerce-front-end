import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import CheckoutStep from './CheckoutStep/CheckoutStep'
import classes from './CheckoutPage.module.css'
import AddressForm from './AddressForm/AddressForm'
import Input from '../../components/UI/Input/Input'
import { login, logout } from '../../store/actions/authActions'
import { getAddress, addOrder } from '../../store/actions/userActions'

const CheckoutPage = (props) => {

    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [paymentOption, setPaymentOption] = useState('')
    const [currentStep, setCurrentStep] = useState(1)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [showEditAddressForm, setShowEditAddressForm] = useState(false)
    const [editingAddress, setEditingAddress] = useState({})

    useEffect(() => {
        if (auth.authenticated) {
            dispatch(getAddress())
            setCurrentStep(2)
        }
        if (!auth.authenticated) {
            setCurrentStep(1)
        }
    }, [auth.authenticated])
    //1) create timeline. Flexible should be able to define number of total steps and current step
    //2) create checkoutstep components. Should be flexible and be displayed depending on the current step
    //3) stepnumber is stored in useState. 
    //4) Next and previous button to change step number but cannot go below 1 and above 4.
    //5) Design form components using .card e.g. login (if auth.authenticated false) / radio button for selecting addresses and address form
    //6) 3 and 4 not done 
    //6) Address form should be a container that manages its own state. Used for get and add addresses

    const onSignIn = () => {
        const user = {
            email, password
        }
        dispatch(login(user))
    }

    const totalQuantity = Object.keys(cart.cartItems).reduce((total, currentKey) => {
        return (
            total + cart.cartItems[currentKey].qty
        )
    }, 0)

    const totalPrice = Object.keys(cart.cartItems).reduce((total, currentKey) => {
        return total + cart.cartItems[currentKey].qty * cart.cartItems[currentKey].price
    }, 0)

    const onConfirmOrder = () => {
        if (paymentOption === '') {
            return alert('Please select a payment option')
        }
        const payload = {
            totalAmount: totalPrice,
            address: selectedAddress,
            paymentStatus: "pending",
            items: Object.keys(cart.cartItems).map(key => {
                return {
                    productId: cart.cartItems[key]._id,
                    quantity: cart.cartItems[key].qty,
                    purchasedPrice: cart.cartItems[key].price
                }
            })
        }
        dispatch(addOrder(payload))
    }

    return (
        <Layout>
            <div>
                <CheckoutStep
                    label="Sign In"
                    stepNumber={1}
                    totalSteps={4}
                    currentStep={currentStep}
                    timelineLabels={['Sign In', 'Address', 'Order Summary', 'Payment Option']}
                    onSubmit={onSignIn}>
                    <div className={classes.signinForm}>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </CheckoutStep>
                <CheckoutStep
                    label="Select your address"
                    stepNumber={2}
                    totalSteps={4}
                    currentStep={currentStep}
                    timelineLabels={['Sign In', 'Address', 'Order Summary', 'Payment Option']}
                    onArrowBack={() => dispatch(logout())}
                    onSubmit={() => {
                        if (selectedAddress === '') {
                            return alert("Select an address")
                        }
                        setCurrentStep(3)
                    }}>
                    <div style={{ padding: "40px 0px 40px 0px" }} className={classes.selectAddressGroup}>
                        {user.address ? user.address.map((item, index) => {
                            return (
                                <div key={index} onChange={(e) => { setSelectedAddress(e.target.value) }}>
                                    <div className={classes.radio}>
                                        <input
                                            type="radio"
                                            name="address"
                                            value={item._id} />
                                        <div className={classes.addressDesc}>{item.address}</div>
                                    </div>
                                    <div className={classes.edit} onClick={() => {
                                        setEditingAddress(item)
                                        setShowEditAddressForm(true)
                                    }}>Edit</div>
                                </div>
                            )
                        }) : null}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className={classes.addNewAddressBtn} onClick={() => setShowAddressForm(true)}
                            >Add new address</div>
                        </div>
                    </div>
                </CheckoutStep>
                <CheckoutStep
                    label="Order Summary"
                    stepNumber={3}
                    totalSteps={4}
                    currentStep={currentStep}
                    timelineLabels={['Sign In', 'Address', 'Order Summary', 'Payment Option']}
                    onArrowBack={() => {
                        setCurrentStep(2)
                    }}
                    confirmationText={<span>A confirmation email will be sent to <b>{auth.user.email}</b></span>}
                    onSubmit={() => {
                        if (Object.keys(cart.cartItems).length === 0) {
                            return alert("No items in cart.")
                        }
                        //use send grid 
                        setCurrentStep(4)
                    }}
                >
                    <div style={{ padding: "40px 0px 60px 0px" }}>
                        {Object.keys(cart.cartItems).map((key, index) => {
                            return (
                                <div key={index} className={classes.summaryRow}>
                                    <span className={classes.rowLeft}>{cart.cartItems[key].name}</span>
                                    <div className={classes.rowRight}>
                                        <div className={classes.qty}>Qty: {cart.cartItems[key].qty}</div>
                                        <div className={classes.itemPrice}>${cart.cartItems[key].qty * cart.cartItems[key].price}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={classes.summaryRow}>
                            <span className={classes.rowLeft}>Total</span>
                            <div className={classes.rowRight}>
                                <div className={classes.qty}>Qty: {totalQuantity}</div>
                                <div className={classes.itemPrice}>${totalPrice}</div>
                            </div>
                        </div>
                    </div>
                </CheckoutStep>
                <CheckoutStep
                    label="Payment options"
                    stepNumber={4}
                    totalSteps={4}
                    currentStep={currentStep}
                    timelineLabels={['Sign In', 'Address', 'Order Summary', 'Payment Option']}
                    onArrowBack={() => {
                        setCurrentStep(3)
                    }}
                    onSubmit={() => {

                        //implement stripe payment gateway
                        onConfirmOrder()
                        props.history.push('/orders')
                    }}>
                    <div
                        className={classes.optionsContainer}
                        onChange={(e) => setPaymentOption(e.target.value)}>
                        <input type="radio" value="cash" name="payment" />
                        <span>Cash on delivery</span>
                    </div>

                </CheckoutStep>
                <AddressForm
                    show={showAddressForm}
                    setShow={setShowAddressForm}
                    label="Add new address"
                    btnLabel="Add" />
                <AddressForm
                    show={showEditAddressForm}
                    setShow={setShowEditAddressForm}
                    editingAddress={editingAddress}
                    type="edit"
                    label="Edit address"
                    btnLabel="Save changes" />
            </div>
        </Layout>
    )
}

export default CheckoutPage