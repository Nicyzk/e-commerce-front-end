import React from 'react'
import { useSelector } from 'react-redux'
import classes from './MenuHeader.module.css'

const MenuHeader = () => {

    const category = useSelector(state => state.category)

    const renderCategories = (categories) => {
        let list = []
        for (let cat of categories) {
            list.push(
                cat.parentId ?
                    <li key={cat.name} className={classes.childrenCat}>
                        <a href={`/products/${cat.slug}/?category=${cat.id}&type=${cat.type}`}>{cat.name}</a>
                        {cat.children.length > 0 ? <ul>{renderCategories(cat.children)}</ul> : null}
                    </li> :
                    <span key={cat.name} className={classes.parentCat}>
                        {cat.name}
                        {cat.children.length > 0 ? <ul className={classes.dropDownBox}>{renderCategories(cat.children)}</ul> : null}
                    </span>
            )
        }
        return list
    }

    return (
            <div className={classes.menuHeader}>
                <ul>
                    {renderCategories(category.categories)}
                </ul>
            </ div>
    )
}

export default MenuHeader