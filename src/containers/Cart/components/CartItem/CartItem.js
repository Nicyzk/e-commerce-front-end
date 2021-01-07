import React from 'react'
import classes from './CartItem.module.css'
import { generatePublicURL } from '../../../../urlConfig'

const CartItem = (props) => {
    const { name, price, img, qty } = props.cartItem
    const { onQuantityDec, onQuantityInc } = props

    const selectedImage = img.length > 0 ? 
    generatePublicURL(img[0].img)
    : null

    return (
        <div className={classes.cartItem}>
            <div className={classes.cartItemLeft}>
                <div className={classes.imgContainer}><img src={ selectedImage } alt="" /></div>
                <div style={{ height: "30%", display: "flex", alignItems: "center" }}>
                    <div className={classes.quantityBtns}>
                        <button onClick={onQuantityDec}>-</button><input type="text" readOnly value={qty}/><button onClick={onQuantityInc}>+</button>
                    </div>
                </div>
            </div>
            <div className={classes.cartItemRight}>
                <div className={classes.itemDetails}>
                    <div className={classes.itemName}>{name}</div>
                    <div className={classes.itemPrice}>${price}</div>

                </div>
                <div className={classes.saveOrRemove}>
                    <div>SAVE FOR LATER</div>
                    <div>REMOVE</div>
                </div>
            </div>
        </div>
    )
}

export default CartItem