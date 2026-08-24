import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../Context/ShopContext";

function Cart() {
  const {
    products,
    currency,
    delevery_charges,
    cartItems,
    updateQuantity,
    getCartAmount,
  } = useContext(myContext);

  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productData = products.find((product) => product._id === items);
            if (productData) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item],
                productData,
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const subtotal = getCartAmount();
  const total = subtotal + (subtotal > 0 ? delevery_charges : 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {cartData.length === 0 ? (
        <div className="mx-auto flex min-h-80 max-w-xl flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white px-6 py-12 text-center shadow-sm">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1.1 2.2A1 1 0 0 0 6.8 17H17M17 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Discover products you love and add them to your cart to continue
            shopping.
          </p>
          <Link
            to="/collection"
            className="mt-6 bg-black px-6 py-3 text-xs font-medium tracking-widest text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer"
          >
            SHOP COLLECTION
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="border-t border-gray-200">
              {cartData.map((item) => {
                const product = item.productData;
                const imageSrc = Array.isArray(product.image)
                  ? product.image[0]
                  : product.image;

                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex items-center gap-6 py-6 border-b border-gray-200"
                  >
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-20 h-24 object-cover bg-gray-100"
                    />

                    <div className="flex-1">
                      <p className="text-slate-700 font-semibold truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-700 font-medium">
                          {currency}
                          {product.price}
                        </span>
                        <span className="border border-gray-300 text-slate-500 text-sm px-3 py-1 bg-gray-50">
                          {item.size}
                        </span>
                      </div>
                    </div>

                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val === 0 || val === "") return;
                        updateQuantity(item._id, item.size, val);
                      }}
                      className="w-16 sm:w-20 border border-gray-400 px-3 py-2 text-slate-700 focus:outline-none"
                    />

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-gray-700 hover:text-red-500 transition cursor-pointer p-1"
                      title="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 0h8l-.5 12.5A2 2 0 0113.5 21h-3a2 2 0 01-2-2L7.5 7z"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
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
                {subtotal > 0 ? delevery_charges.toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="py-3 flex justify-between font-bold text-slate-800 text-base">
              <span>Total</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="mt-6 w-full bg-black text-white tracking-widest text-sm py-4 hover:bg-slate-800 transition cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
