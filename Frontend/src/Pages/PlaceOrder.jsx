import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import { myContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

function PlaceOrder() {
  const {
    products,
    currency,
    delevery_charges,
    cartItems,
    setCartItems,
    getCartAmount,
    token,
    backendUrl,
    navigate,
  } = useContext(myContext);

  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = getCartAmount();
  const shippingFee = subtotal > 0 ? delevery_charges : 0;
  const total = subtotal + shippingFee;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (total === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: total,
      };

      let endpoint = "/api/order/place";
      if (method === "stripe") {
        endpoint = "/api/order/stripe";
      } else if (method === "razorpay") {
        endpoint = "/api/order/razorpay";
      }

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        setCartItems({});
        toast.success(data.message || "Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Network error while placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-16"
    >
      {/* Delivery Information */}
      <div className="flex-1">
        <Title title1="Delivery" title2="Information" />

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
            placeholder="Street address"
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
            placeholder="Phone number"
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
        <div className="py-3 flex justify-between font-bold text-slate-800 text-base">
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

        <div className="flex flex-col sm:flex-row gap-3">
          <div
            onClick={() => setMethod("stripe")}
            className="flex items-center gap-3 border border-gray-300 px-4 py-3 cursor-pointer flex-1 select-none"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-gray-400 ${
                method === "stripe" ? "bg-green-500 border-green-500" : ""
              }`}
            />
            <span className="text-indigo-600 font-bold italic text-base">
              Stripe
            </span>
          </div>

          <div
            onClick={() => setMethod("razorpay")}
            className="flex items-center gap-3 border border-gray-300 px-4 py-3 cursor-pointer flex-1 select-none"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-gray-400 ${
                method === "razorpay" ? "bg-green-500 border-green-500" : ""
              }`}
            />
            <span className="text-blue-800 font-bold italic text-base">
              Razorpay
            </span>
          </div>

          <div
            onClick={() => setMethod("cod")}
            className="flex items-center gap-3 border border-gray-300 px-4 py-3 cursor-pointer flex-1 select-none"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-gray-400 ${
                method === "cod" ? "bg-green-500 border-green-500" : ""
              }`}
            />
            <span className="text-slate-600 tracking-wide text-xs font-semibold">
              CASH ON DELIVERY
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || total === 0}
          className="mt-8 w-full bg-black text-white tracking-widest text-sm py-4 hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
        >
          {loading ? "PROCESSING ORDER..." : "PLACE ORDER"}
        </button>
      </div>
    </form>
  );
}

export default PlaceOrder;