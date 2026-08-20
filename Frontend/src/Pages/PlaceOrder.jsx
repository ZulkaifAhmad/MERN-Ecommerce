import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import { myContext } from '../Context/ShopContext'

function PlaceOrder() {
  const { products, currency, delevery_charges, cartItems } = useContext(myContext)

  const [method, setMethod] = useState('cod')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Compute subtotal from cartItems
  let subtotal = 0
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size]
      if (quantity > 0) {
        const productData = products.find((p) => p._id === productId)
        if (productData) subtotal += productData.price * quantity
      }
    }
  }
  const shippingFee = subtotal > 0 ? delevery_charges : 0
  const total = subtotal + shippingFee

  const onSubmitHandler = (e) => {
    e.preventDefault()
    // handle order placement here
    console.log({ formData, method, total })
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-16"
    >
      {/* Delivery Information */}
      <div className="flex-1">
        <Title title1="Delevery" title2="Information" />

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First name"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last name"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
          />

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              placeholder="Zip code"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600"
          />
        </div>
      </div>

      {/* Cart Totals + Payment */}
      <div className="w-full lg:w-[420px]">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm tracking-widest uppercase text-slate-400">
            Cart <span className="font-bold text-slate-800">Totals</span>
          </h2>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="border-b border-gray-200 py-3 flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="border-b border-gray-200 py-3 flex justify-between text-gray-600">
          <span>Shipping Fee</span>
          <span>
            {currency}
            {shippingFee.toFixed(2)}
          </span>
        </div>
        <div className="py-3 flex justify-between font-bold text-slate-800">
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-10 mb-4">
          <h2 className="text-sm tracking-widest uppercase text-slate-400">
            Payment <span className="font-bold text-slate-800">Method</span>
          </h2>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div
            onClick={() => setMethod('stripe')}
            className="flex items-center gap-3 border border-gray-300 px-5 py-4 cursor-pointer flex-1"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-gray-400 ${
                method === 'stripe' ? 'bg-green-500 border-green-500' : ''
              }`}
            />
            <span className="text-indigo-600 font-bold italic text-lg">stripe</span>
          </div>

          <div
            onClick={() => setMethod('razorpay')}
            className="flex items-center gap-3 border border-gray-300 px-5 py-4 cursor-pointer flex-1"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-gray-400 ${
                method === 'razorpay' ? 'bg-green-500 border-green-500' : ''
              }`}
            />
            <span className="text-blue-800 font-bold italic text-lg">Razorpay</span>
          </div>

          <div
            onClick={() => setMethod('cod')}
            className="flex items-center gap-3 border border-gray-300 px-5 py-4 cursor-pointer flex-1"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-gray-400 ${
                method === 'cod' ? 'bg-green-500 border-green-500' : ''
              }`}
            />
            <span className="text-slate-500 tracking-wide text-sm">CASH ON DELIVERY</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={total === 0}
          className="mt-8 w-full sm:w-auto sm:px-16 bg-black text-white tracking-widest text-sm py-4 disabled:opacity-40"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  )
}

export default PlaceOrder