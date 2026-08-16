import React, { createContext } from 'react'
import { products } from '../assets/frontend_assets/assets.js'

export let myContext = createContext()

function ShopContext({children}) {
    let latest_products = {
        products
    }
    let currency = `$`
    let delevery_charges = 10

  return (
    <myContext.Provider value={{latest_products , currency , delevery_charges}}>
        {children}
    </myContext.Provider>
  )
}

export default ShopContext

