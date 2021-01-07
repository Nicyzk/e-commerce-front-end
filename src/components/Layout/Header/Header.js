import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import { IoLeafSharp, IoCartSharp, IoSearchSharp } from "react-icons/io5";
import SignInModal from './SignInModal/SignInModal'
import { login, logout } from '../../../store/actions/authActions'

const Header = () => {

    // Modal Logic
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSignIn = () => {
        const user = {
            email, password
        }
        dispatch(login(user))
        setShowSignInModal(false)
    }

    return (
        <>
            <div className={classes.header}>
                <div className={classes.logo}>SEQUOIA <IoLeafSharp /></div>
                <div className={classes.searchBar}>
                    <input type="text" placeholder="Search"></input><IoSearchSharp />
                </div>
                <div className={classes.navRight}>
                    {auth.authenticated ? 
                    <>
                    <div className={classes.loggedInName}>{auth.user.firstName + ' ' + auth.user.lastName}</div> 
                    <div className={classes.signin}><button onClick={() => dispatch(logout())}>Sign Out</button></div>
                    </>
                    : <div className={classes.signin}><button onClick={() => setShowSignInModal(true)}>Sign In</button></div>}
                    
                    <Link to="/cart" style={{textDecoration: "none", color: "white"}}><div className={classes.cart}><IoCartSharp /></div></Link>
                </div>
            </div>
            <SignInModal
                show={showSignInModal}
                handleClose={() => setShowSignInModal(false)}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSignIn={onSignIn}
            />
        </>
    )
}

export default Header