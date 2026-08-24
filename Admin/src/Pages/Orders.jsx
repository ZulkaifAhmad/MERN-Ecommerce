import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { toast } from "react-toastify";

const statusOptions = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const Orders = ({ token, backendUrl }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      if (!token) return;
      setLoading(true);

      const response = await fetch(`${backendUrl}/api/order/list`, {
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
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      toast.error("Network error while loading orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const response = await fetch(`${backendUrl}/api/order/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Network error while updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="flex flex-col gap-3 text-sm pb-10">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">
          Customer Orders ({orders.length})
        </p>
        <button
          onClick={fetchAllOrders}
          disabled={loading}
          className="border border-gray-300 px-3 py-1.5 rounded text-xs font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          {loading ? "Refreshing..." : "Refresh Orders"}
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 border border-gray-200 p-5 rounded-lg bg-white items-start text-gray-700 shadow-sm"
          >
            {/* Icon */}
            <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 shrink-0">
              <Package size={24} className="text-slate-800" />
            </div>

            {/* Customer / items info */}
            <div className="flex flex-col gap-1.5">
              <div className="font-medium text-gray-900 leading-snug">
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm">
                    {item.name} x {item.quantity}{" "}
                    <span className="text-xs text-gray-500 font-semibold border px-1.5 py-0.5 rounded bg-gray-50">
                      {item.size}
                    </span>
                  </p>
                ))}
              </div>

              <p className="font-semibold text-gray-900 mt-2">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-xs text-gray-600">
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}, {order.address.country} -{" "}
                {order.address.zipcode}
              </p>
              <p className="text-xs text-gray-600">
                📞 {order.address.phone} | ✉ {order.address.email}
              </p>
            </div>

            {/* Method / payment / date */}
            <div className="flex flex-col gap-1 text-xs md:min-w-[140px]">
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={
                    order.payment
                      ? "text-green-600 font-semibold"
                      : "text-orange-500 font-semibold"
                  }
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Price */}
            <div className="md:min-w-[70px]">
              <p className="font-bold text-gray-900 text-base">
                ${order.amount}
              </p>
              <p className="text-[11px] text-gray-400">
                {order.items.length} items
              </p>
            </div>

            {/* Status dropdown */}
            <select
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
              className="border border-gray-300 rounded px-3 py-2 text-xs font-semibold outline-none bg-white cursor-pointer md:min-w-[150px] focus:border-slate-800"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}

        {orders.length === 0 && !loading && (
          <div className="py-16 text-center text-gray-400 bg-white border border-gray-200 rounded-lg">
            No customer orders placed yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;