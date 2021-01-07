import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getProductsBySlug } from '../../../store/actions/productActions'
import classes from './ProductStore.module.css'
import { generatePublicURL } from '../../../urlConfig'

const ProductStore = () => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { slug } = useParams()

    useEffect(() => {
        dispatch(getProductsBySlug(slug))
    }, [])

    return (
            <div className={classes.pageContent}>
                {Object.keys(products.productsByPrice).map(priceRange => {
                    if (products.productsByPrice[priceRange].length === 0) {
                        return null
                    }
                    return (
                        <div className={classes.card}>
                            <div className={classes.cardHeader}>
                                <div>Samsung Mobile Under S${/\d+$/.exec(priceRange)[0]}</div>
                                <button className={classes.viewAll}>View All</button>
                            </div>
                            <div className={classes.productsContainer}>
                                {products.productsByPrice[priceRange].map(item => {
                                    return (
                                        <Link 
                                        to={`/${item.slug}/${item._id}/p`}
                                        style={{display: "block"}}
                                        className={classes.product}>
                                            <div className={classes.imgContainer}>
                                                {item.productPictures.length > 0 ? <img 
                                                src={generatePublicURL(item.productPictures[0].img)}
                                                alt="samsung" />: <div>No picture was added</div>}
                                            </div>
                                            <div className={classes.detailsContainer}>
                                                <div className={classes.productPrice}>S${item.price}</div>
                                                <div>{item.name}</div>
                                                <div>
                                                    <button className={classes.ratings}>
                                                        <span>4.3</span>
                                                    </button>
                                                    <span className={classes.noofreviews}>3502</span>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}

export default ProductStore