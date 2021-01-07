import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    const {
        label,
        placeholder,
        value,
        onChange,
        type
    } = props

    const width = props.width ? props.width : '300px'
    let input
    switch (type) {
        case 'text-flexible-width':
            input = (
                <div className={classes.formGroup} style={{ width: width }}>
                    <label className={classes.label}>{label}</label>
                    <input
                        className={classes.input}
                        type="text"
                        placeholder={placeholder}
                        style={{ width: width, boxSizing: "border-box" }}
                        value={value}
                        onChange={onChange} />
                </div>
            )
            break;
        case 'password':
            input = (
                <div className={classes.formGroup}>
                    <label className={classes.label}>{label}</label>
                    <input
                        className={classes.input}
                        type="password"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange} />
                </div>
            )
            break;
        default:
            input = (
                <div className={classes.formGroup}>
                    <label className={classes.label}>{label}</label>
                    <input
                        className={classes.input}
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange} />
                </div>
            )
    }
    return input
}


export default input