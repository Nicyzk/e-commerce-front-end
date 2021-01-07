import React from 'react'
import Header from './Header/Header'
import MenuHeader from './MenuHeader/MenuHeader'

const layout = (props) =>{
    return (
        <div>
            <Header/>
            <MenuHeader/>
            {props.children}
        </div>
    )
}

export default layout