import React from 'react'
import classes from './CheckoutStep.module.css'
import Timeline from '../Timeline/Timeline'
import { BiArrowBack } from 'react-icons/bi'

const checkoutStep = (props) => {
    const {
        stepNumber,
        currentStep,
        totalSteps,
        timelineLabels,
        label,
        onArrowBack,
        onSubmit
    } = props

    let show = {
        display: 'none'
    }
    let showArrowBack = {
        display: 'none'
    }
    if (currentStep === stepNumber) {
        show.display = 'block'
    }
    if (stepNumber > 1) {
        showArrowBack.display = 'block'
    }

    let btnDivStyle = {
        padding: "0 20px",
        textAlign: "right"
    }
    if (props.confirmationText) {
        btnDivStyle = {
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }
    }
    return (
        <div style={show} className={'card ' + classes.container}>
            <div style={showArrowBack} onClick={onArrowBack} className={classes.arrowBack}><BiArrowBack /></div>
            <div className={classes.labelContainer}><label>{label}</label></div>
            <div className={classes.timelineContainer}>
                <Timeline
                    totalSteps={totalSteps}
                    currentStep={currentStep}
                    timelineLabels={timelineLabels} />
            </div>
            {props.children}
            <div style={btnDivStyle}>
                {props.confirmationText ? <div>{props.confirmationText}</div> : null}
                <button
                    onClick={onSubmit}
                    className={'button-orange'}>Continue</button>
            </div>
        </div>
    )
}

export default checkoutStep