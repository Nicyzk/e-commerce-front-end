import React from 'react'
import classes from './Timeline.module.css'

const timeline = (props) => {

    const totalSteps = props.totalSteps
    const currentStep = props.currentStep
    const timelineLabels = props.timelineLabels

    const renderFirstCircleComponent = () => {
        let isActiveLabel = ''
        if (currentStep === 1) {
            isActiveLabel = ' ' + classes.activeLabel
        }
        return (
            <div style={{ position: "relative" }}>
                <div className={classes.circle + ' ' + classes.activeCircle}>1</div>
                <div className={classes.timelineLabels + isActiveLabel}>{timelineLabels[0]}</div>
            </div>
        )
    }

    const renderLineCircleComponents = () => {
        const component = []
        for (let i = 2; i <= totalSteps; i++) {
            let isActiveCircle = ''
            let isActiveLine = ''
            let isActiveLabel = ''
            if (i <= currentStep) {
                isActiveCircle = ' ' + classes.activeCircle
                isActiveLine = ' ' + classes.activeLine
            }
            if (i === currentStep) {
                isActiveLabel = ' ' + classes.activeLabel
            }
            component.push(
                <div className={classes.lineCircleComponent} key={i}>
                    <div className={classes.line + isActiveLine}></div>
                    <div style={{ position: "relative" }}>
                        <div className={classes.circle + isActiveCircle}>{i}</div>
                        <div className={classes.timelineLabels + isActiveLabel}>{timelineLabels[i - 1]}</div>
                    </div>

                </div>
            )
        }
        return component
    }

    return (
        <div className={classes.timeline}>
            {renderFirstCircleComponent()}
            {renderLineCircleComponents()}
        </div>
    )
}

export default timeline