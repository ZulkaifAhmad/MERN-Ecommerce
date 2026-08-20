import React, { createContext, useState } from 'react'
import { products } from '../assets/frontend_assets/assets.js'

export let myContext = createContext()

function ShopContext({children}) {
    const [showCollectionSearch, setShowCollectionSearch] = useState(false)
    const [collectionSearch, setCollectionSearch] = useState('')
    const [cartItems, setCartItems] = useState({})

    const addToCart = (productId, size) => {
        setCartItems((currentItems) => ({
            ...currentItems,
            [productId]: {
                ...currentItems[productId],
                [size]: (currentItems[productId]?.[size] || 0) + 1,
            },
        }))
    }

    const currency = '$'
    const delevery_charges = 10

  return (
    <myContext.Provider value={{ products, currency, delevery_charges, showCollectionSearch, setShowCollectionSearch, collectionSearch, setCollectionSearch, cartItems, setCartItems, addToCart }}>
        {children}
    </myContext.Provider>
  )
}

export default ShopContext

