import { Package } from "lucide-react";

const dummyOrders = [
  {
    _id: "1",
    items: [],
    itemsText: "Items : 0",
    name: "John Doe",
    address: {
      street: "123 Main St,",
      city: "New York, NY, USA, 10001",
    },
    phone: "1234567890",
    method: "COD",
    payment: "Pending",
    date: "8/22/2026",
    amount: 10,
    status: "Order Placed",
  },
  {
    _id: "2",
    items: [{ name: "Men Round Neck Pure Cotton T-shirt", size: "M", quantity: 1 }],
    itemsText: "Men Round Neck Pure Cotton T-shirt x 1 M",
    name: "John Doe",
    address: {
      street: "123 Main St,",
      city: "New York, NY, USA, 10001",
    },
    phone: "1234567890",
    method: "COD",
    payment: "Pending",
    date: "8/22/2026",
    amount: 90,
    status: "Order Placed",
  },
];

const statusOptions = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const Orders = () => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p className="text-lg text-gray-700">Order Page</p>

      <div className="flex flex-col gap-3">
        {dummyOrders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 border border-gray-200 p-4 items-start text-gray-700"
          >
            {/* Icon */}
            <div className="w-14 h-14 border border-gray-300 flex items-center justify-center bg-white shrink-0">
              <Package size={26} className="text-gray-700" />
            </div>

            {/* Customer / items info */}
            <div className="flex flex-col gap-1">
              {order.items.length > 0 ? (
                <p className="font-normal">{order.itemsText}</p>
              ) : (
                <p className="font-normal">{order.itemsText}</p>
              )}
              <p className="font-semibold text-gray-800">{order.name}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}</p>
              <p>{order.phone}</p>
            </div>

            {/* Method / payment / date */}
            <div className="flex flex-col gap-1 md:min-w-[160px]">
              <p>Method : {order.method}</p>
              <p>Payment : {order.payment}</p>
              <p>Date : {order.date}</p>
            </div>

            {/* Price */}
            <div className="md:min-w-[60px]">
              <p className="font-medium">${order.amount}</p>
            </div>

            {/* Status dropdown */}
            <select
              defaultValue={order.status}
              className="border border-gray-300 px-3 py-2 font-semibold outline-none bg-white cursor-pointer md:min-w-[170px]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;