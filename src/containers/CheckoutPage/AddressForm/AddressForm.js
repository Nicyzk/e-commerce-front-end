import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi'
import classes from './AddressForm.module.css'
import Input from '../../../components/UI/Input/Input'
import { addAddress, editAddress } from '../../../store/actions/userActions'

const AddressForm = (props) => {

    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')
    const [cityDistrict, setCityDistrict] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()

    const label = props.label
    const btnLabel = props.btnLabel
    const {
        show,
        setShow
    } = props

    const toShow = { display: 'none' }
    if (show) {
        toShow.display = 'block'
    }

    useEffect(() => {
        if (show) {
            if (props.type === "edit") {
                setName(props.editingAddress.name)
                setMobileNumber(props.editingAddress.mobileNumber)
                setPostalCode(props.editingAddress.postalCode)
                setAddress(props.editingAddress.address)
                setCityDistrict(props.editingAddress.cityDistrict)
                setState(props.editingAddress.state)
                setCountry(props.editingAddress.country)
            }
        }
    }, [show])

    const onAddAddress = () => {
        const addressObj = {
            name, 
            mobileNumber,
            postalCode,
            address,
            cityDistrict,
            state,
            country
        }
        dispatch(addAddress(addressObj))
        setShow(false)
    }

    const onEditAddress = () => {
        const addressObj = {
            _id: props.editingAddress._id,
            name, 
            mobileNumber,
            postalCode,
            address,
            cityDistrict,
            state,
            country
        }
        dispatch(editAddress(addressObj))
        setShow(false)
    }

    const onSubmit = props.type === "edit" ? onEditAddress : onAddAddress

    return (
        <div className={classes.backdrop} style={toShow}>
            <div className={'card ' + classes.container}>
                <div className={classes.arrowBack} onClick={() => {
                    setShow(false)
                }}><BiArrowBack /></div>
                <div className={classes.labelContainer}><label>{label}</label></div>
                <div className={classes.formContainer}>
                    <div className={classes.formRow}>
                        <Input
                            label="Name"
                            placeholder="Enter name"
                            type="text-flexible-width"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Mobile number"
                            placeholder="Enter mobile number"
                            type="text-flexible-width"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                    <div className={classes.formRow}>
                        <Input
                            label="Postal code"
                            placeholder="Enter postal code"
                            type="text-flexible-width"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <Input
                            label="City/District"
                            placeholder="Enter city or district"
                            type="text-flexible-width"
                            value={cityDistrict}
                            onChange={(e) => setCityDistrict(e.target.value)}
                        />
                    </div>
                    <div className={classes.formRow}>
                        <Input
                            label="State"
                            placeholder="Enter state"
                            type="text-flexible-width"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <Input
                            label="Country"
                            placeholder="Enter country"
                            type="text-flexible-width"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            label="Address"
                            placeholder="Enter your address"
                            type="text-flexible-width"
                            width="100%"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{
                    padding: "0 20px",
                    textAlign: "right"
                }}>
                    <button 
                    className={'button-orange'}
                    onClick={onSubmit}>{btnLabel}</button>
                </div>
            </div>
        </div>

    )
}

export default AddressForm

