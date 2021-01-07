import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductPage } from '../../../store/actions/productActions'
import getQueryParams from '../../../helpers/getQueryParams'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import classes from './ProductPage.module.css'

const ProductPage = (props) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        const params = getQueryParams(props.location.search)
        dispatch(getProductPage(params))
    }, [])

    const { page } = products

    return (
        <div className={classes.pageContent}>
            <h3 className={classes.pageTitle}>{page.title} Store</h3>
            <Carousel renderThumbs={() => { }}>
                {page.bannerImages ? page.bannerImages.map((banner, index) => {
                    return (
                        <a style={{display: "block"}} href={banner.navigateTo}>
                            <div key={index} className={classes.imgContainer} >
                                <img src={banner.img} alt="" />
                            </div>
                        </a>
                    )
                }) : null}
            </Carousel>
            <div className={classes.productsDiv}>
                {page.productImages ? page.productImages.map((product, index) => {
                    return (
                        <div className={classes.productContainer} key={index}>
                            <img src={product.img} alt=""/>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default ProductPage