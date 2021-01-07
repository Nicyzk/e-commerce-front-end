import React from 'react'
import { MdClose } from "react-icons/md";
import classes from './SignInModal.module.css'

const signInModal = (props) => {

    const {
        show,
        handleClose,
        email,
        setEmail,
        password,
        setPassword,
        onSignIn
    } = props

    const style = {}
    show ? style.display = "block" : style.display = "none"

    return (
        <div className={classes.backdrop} style={style} >
            <div className={classes.modal}>
                <div className={classes.modalLeft}>
                    <div>
                        <div><h1>Welcome back to Sequoia</h1></div>
                        <div>Sign in to continue to your account</div>
                    </div>
                </div>
                <div className={classes.modalRight}>
                    <div style={{ textAlign: "right" }}>
                        <button className={classes.closebtn} onClick={handleClose}><MdClose /></button>
                    </div>
                    <div><h1 style={{ margin: "0px" }}>Sign In</h1></div>
                    <div className={classes.inputContainer}>
                        <div>
                            <input
                                className={classes.input}
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"></input>
                        </div>
                        <div>
                            <input
                                className={classes.input}
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter password"></input>
                            <div className={classes.forgotPassword}>Forgot Password?</div>
                        </div>

                        <button 
                            className={classes.continue}
                            onClick={onSignIn}
                        >Continue</button>
                    </div>
                    <div style={{ textAlign: "center", cursor: "pointer" }}>New? Create an account here</div>
                </div>
            </div>
        </div >
    )
}

export default signInModal