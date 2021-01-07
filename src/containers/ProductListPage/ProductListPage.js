import React from 'react'
import Layout from '../../components/Layout/Layout'
import ProductStore from './ProductStore/ProductStore'
import ProductPage from './ProductPage/ProductPage'
import getQueryParams from '../../helpers/getQueryParams'

const ProductListPage = (props) => {

    const renderProducts = () => {
        const params = getQueryParams(props.location.search)
        let content = null
        switch(params.type) {
            case "Store":
                content = <ProductStore {...props}/>
                break;
            case "Page":
                content = <ProductPage {...props}/>
                break;
            default:
                content = null
        }
        return content 
    }
    return (
        <Layout>
            {renderProducts()}
        </Layout>

    )
}

export default ProductListPage