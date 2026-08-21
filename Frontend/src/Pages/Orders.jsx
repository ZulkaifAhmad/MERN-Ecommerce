import React, { useContext } from 'react'
import { myContext } from '../Context/ShopContext.jsx'
import Title from '../Components/Title.jsx'

function Orders() {
  let { products, currency, cartItems } = useContext(myContext)

  // Build the order list from cartItems: { productId: { size: quantity } }
  const orderList = []
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size]
      if (quantity > 0) {
        const productData = products.find((p) => p._id === productId)
        if (productData) {
          orderList.push({
            ...productData,
            size,
            quantity,
            date: productData.date || '25, Jul, 2024',
            status: productData.status || 'Ready to ship',
          })
        }
      }
    }
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-10">
      <div className="text-2xl">
        <Title title1="My" title2="Orders" />
      </div>

      <div className="mt-6 border-t border-gray-200">
        {orderList.map((order) => (
          <div
            key={`${order._id}-${order.size}`}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 border-b border-gray-200"
          >
            {/* Image + info */}
            <div className="flex gap-4 sm:gap-6 flex-1">
              <img
                src={order.image?.[0] || order.image}
                alt={order.name}
                className="w-20 h-24 sm:w-24 sm:h-28 object-cover bg-gray-100 shrink-0"
              />

              <div className="flex flex-col justify-center gap-1.5">
                <p className="text-slate-700 font-semibold leading-snug">
                  {order.name}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-sm">
                  <span className="text-base text-slate-700">
                    {currency}
                    {order.price}
                  </span>
                  <span>Quantity: {order.quantity}</span>
                  <span>Size: {order.size}</span>
                </div>

                <p className="text-sm text-gray-500">
                  Date:{' '}
                  <span className="text-gray-400">{order.date}</span>
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 sm:w-48">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
              <span className="text-gray-700 text-sm sm:text-base">
                {order.status}
              </span>
            </div>

            {/* Track order button */}
            <div className="sm:w-40 sm:text-right">
              <button className="w-full sm:w-auto border border-gray-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 transition">
                Track Order
              </button>
            </div>
          </div>
        ))}

        {orderList.length === 0 && (
          <p className="py-10 text-center text-gray-400">
            You haven't placed any orders yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default Orders