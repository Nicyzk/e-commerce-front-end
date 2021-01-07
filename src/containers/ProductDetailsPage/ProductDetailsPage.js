import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import { getProductDetailsById } from '../../store/actions/productActions'
import { addToCart } from '../../store/actions/cartActions'
import classes from './ProductDetailsPage.module.css'
import { generatePublicURL } from '../../urlConfig'
import { FaFacebookMessenger, FaFacebook, FaGooglePlus, FaPinterest, FaRegHeart } from 'react-icons/fa'

const ProductDetailsPage = (props) => {
    const dispatch = useDispatch()
    const { productId } = props.match.params
    const products = useSelector(state => state.products)
    const [selectedImage, setSelectedImage] = useState('')
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(getProductDetailsById(productId))
    }, [])

    if (Object.keys(products.productDetails).length === 0) {
        return null
    }

    const firstImage = products.productDetails.productPictures.length > 0 ?
        generatePublicURL(products.productDetails.productPictures[0].img)
        : null

    const onAddToCart = () => {
        const { _id, name, price } = products.productDetails
        const img = products.productDetails.productPictures
        const qty = quantity === "" ? 0 : quantity
        dispatch(addToCart({ _id, name, price, img }, qty))
        props.history.push('/cart')
    }

    const qty = quantity === "" ? 0 : quantity
    console.log(qty)

    return (
        <Layout>
            <div className={classes.pageContent}>
                <div className={classes.productContainer}>
                    <div className={classes.imagesContainer}>
                        <div className={classes.selectedImage}>
                            <img src={selectedImage === '' ?
                                firstImage
                                : selectedImage
                            } alt="" />
                        </div>
                        <div className={classes.thumbnailGallery}>
                            {products.productDetails.productPictures.map(picture => {
                                return (
                                    <div className={classes.thumbnail}>
                                        <img
                                            src={generatePublicURL(picture.img)}
                                            onMouseOver={() => setSelectedImage(generatePublicURL(picture.img))} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                        <div className={classes.shareContainer}>
                            <div className={classes.shareBtns}>Share
                                <a><FaFacebookMessenger style={{ color: "#006AFF" }} /></a>
                                <a> <FaFacebook style={{ color: "#4267B2" }} /></a>
                                <a><FaGooglePlus style={{ color: "#DB4437" }} /></a>
                                <a><FaPinterest style={{ color: "#E60023" }} /></a>
                            </div>
                            <div className={classes.favourites}>
                                <FaRegHeart style={{ color: "salmon" }} />
                                Favourites (105)
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightContainers}>
                        <div className={classes.detailsContainer}>
                            <div style={{ fontSize: "20px" }}>{products.productDetails.name}</div>
                            <div style={{ fontSize: "30px", fontWeight: "600", color: "salmon" }}>${products.productDetails.price}</div>
                            <div>
                                <p style={{ color: "#888" }}>Description </p>
                                <p>{products.productDetails.description}</p>
                            </div>
                        </div>
                        <div className={classes.cartContainer}>
                            <div className={classes.quantity}>
                                <div><p>Quantity</p></div>
                                <div className={classes.quantityBtns}>
                                    <button
                                    onClick={() => {
                                        if (quantity === '' || quantity === 0) {
                                            return
                                        }
                                        console.log(quantity)
                                        if (quantity > 0) {
                                            const qty = quantity
                                            setQuantity(qty - 1)
                                        }
                                    }}>-</button>
                                    <input
                                        type="text"
                                        value={quantity.toString()}
                                        onChange={(e) => {
                                            if (e.target.value === '') {
                                                setQuantity(e.target.value)
                                            }
                                            if (parseInt(e.target.value) >= 0) {
                                                setQuantity(parseInt(e.target.value))
                                            }
                                        }} />
                                    <button
                                    onClick={() => {
                                        const qty = quantity + 1
                                        setQuantity(qty)
                                    }}>+</button>
                                </div>
                            </div>
                            <div className={classes.addToCartContainer}>
                                <button className={classes.addToCart} onClick={onAddToCart}>
                                    Add To Cart
                                </button>
                                <button className={classes.buyNow}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetailsPage