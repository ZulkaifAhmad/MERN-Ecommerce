import { X } from "lucide-react";

const dummyProducts = [
  {
    _id: "1",
    image: "https://placehold.co/100x100/e2e8f0/64748b?text=Trouser",
    name: "Men Tapered Fit Flat-Front Trousers",
    category: "Men",
    price: 63,
  },
  {
    _id: "2",
    image: "https://placehold.co/100x100/e2e8f0/64748b?text=T-shirt",
    name: "Men Round Neck Pure Cotton T-shirt",
    category: "Men",
    price: 80,
  },
  {
    _id: "3",
    image: "https://placehold.co/100x100/e2e8f0/64748b?text=Jacket",
    name: "Women Zip-Up Hooded Jacket",
    category: "Women",
    price: 95,
  },
  {
    _id: "4",
    image: "https://placehold.co/100x100/e2e8f0/64748b?text=Dress",
    name: "Kids Printed Cotton Dress",
    category: "Kids",
    price: 45,
  },
];

const List = () => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="text-lg text-gray-700">All Products List</p>

      <div className="border border-gray-200">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[100px_1fr_120px_100px_80px] items-center bg-gray-100 py-2.5 px-3 font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Table rows */}
        {dummyProducts.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[70px_1fr_60px] md:grid-cols-[100px_1fr_120px_100px_80px] items-center gap-3 py-3 px-3 border-t border-gray-200 text-gray-700"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover"
            />
            <p className="truncate">{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p className="hidden md:block">${item.price}</p>
            <button
              className="text-center text-gray-600 hover:text-red-500 transition-colors cursor-pointer justify-self-center"
              title="Remove"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;