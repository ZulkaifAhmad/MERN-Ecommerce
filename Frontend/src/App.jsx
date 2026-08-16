import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Cart from './Pages/Cart.jsx'
import About from './Pages/About.jsx'
import Collection from './Pages/Collection.jsx'
import Contact from './Pages/Contact.jsx'
import Login from './Pages/Login.jsx'
import Orders from './Pages/Orders.jsx'
import PlaceOrder from './Pages/PlaceOrder.jsx'
import Products from './Pages/Products.jsx'
import Navbar from './Components/Navbar.jsx'

const App = () => {
  return (
    <div className='sm:px-4 md:px-20'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/place-order' element={<PlaceOrder />} />
      <Route path='/product/:slug' element={<Products/>} />
    </Routes>
    </div>
  )
}

export default App

