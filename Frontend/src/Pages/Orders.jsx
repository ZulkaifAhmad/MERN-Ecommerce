import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context/ShopContext.jsx";
import Title from "../Components/Title.jsx";
import { toast } from "react-toastify";

function Orders() {
  const { backendUrl, token, currency } = useContext(myContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      setLoading(true);

      const response = await fetch(`${backendUrl}/api/order/userorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.success) {
        let allOrdersItem = [];
        data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order._id;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error("Error loading user orders:", error);
      toast.error("Network error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <div className="text-2xl">
          <Title title1="My" title2="Orders" />
        </div>
        <button
          onClick={loadOrderData}
          disabled={loading}
          className="border border-gray-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-gray-100 transition cursor-pointer"
        >
          {loading ? "Refreshing..." : "Refresh Orders"}
        </button>
      </div>

      <div className="mt-6 border-t border-gray-200">
        {orderData.map((item, index) => {
          const imageSrc = Array.isArray(item.image)
            ? item.image[0]
            : item.image;

          return (
            <div
              key={`${item.orderId}-${index}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 border-b border-gray-200"
            >
              {/* Image + info */}
              <div className="flex gap-4 sm:gap-6 flex-1">
                <img
                  src={imageSrc}
                  alt={item.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover bg-gray-100 shrink-0"
                />

                <div className="flex flex-col justify-center gap-1.5">
                  <p className="text-slate-700 font-semibold leading-snug">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-sm">
                    <span className="text-base text-slate-700 font-medium">
                      {currency}
                      {item.price}
                    </span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                  </div>

                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Payment:{" "}
                    <span className="text-gray-700 font-medium">
                      {item.paymentMethod} ({item.payment ? "Paid" : "Pending"})
                    </span>
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 sm:w-48">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    item.status === "Delivered"
                      ? "bg-green-500"
                      : item.status === "Shipped" ||
                        item.status === "Out for delivery"
                      ? "bg-blue-500"
                      : "bg-orange-400"
                  }`}
                />
                <span className="text-gray-700 text-sm sm:text-base font-medium">
                  {item.status}
                </span>
              </div>

              {/* Track order button */}
              <div className="sm:w-40 sm:text-right">
                <button
                  onClick={loadOrderData}
                  className="w-full sm:w-auto border border-gray-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}

        {orderData.length === 0 && !loading && (
          <p className="py-16 text-center text-gray-400">
            You haven't placed any orders yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Orders;