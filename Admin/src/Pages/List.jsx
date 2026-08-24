import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const List = ({ token, backendUrl }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/products/getall-products`);
      const data = await response.json();

      if (data.success || data.products) {
        setList(data.products || []);
      } else {
        toast.error(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Network error while loading products");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/products/delete-product/${id}`,
        {
          method: "DELETE",
          headers: {
            token: token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Product deleted successfully");
        await fetchList();
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Network error while deleting product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-3 text-sm pb-10">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">
          All Products List ({list.length})
        </p>
        <button
          onClick={fetchList}
          disabled={loading}
          className="border border-gray-300 px-3 py-1.5 rounded text-xs font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          {loading ? "Refreshing..." : "Refresh List"}
        </button>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden bg-white shadow-sm">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[100px_1fr_120px_100px_80px] items-center bg-gray-100 py-3 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Table rows */}
        {list.map((item) => {
          const imageSrc = Array.isArray(item.image)
            ? item.image[0]
            : item.image;

          return (
            <div
              key={item._id}
              className="grid grid-cols-[70px_1fr_60px] md:grid-cols-[100px_1fr_120px_100px_80px] items-center gap-3 py-3 px-4 border-t border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              <img
                src={imageSrc}
                alt={item.name}
                className="w-14 h-16 sm:w-16 sm:h-18 object-cover rounded bg-gray-100"
              />
              <div>
                <p className="font-medium text-gray-900 truncate max-w-xs sm:max-w-md">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 md:hidden">
                  {item.category} • ${item.price}
                </p>
              </div>
              <p className="hidden md:block text-gray-600">{item.category}</p>
              <p className="hidden md:block font-medium text-gray-900">
                ${item.price}
              </p>
              <button
                onClick={() => removeProduct(item._id)}
                className="text-center text-gray-400 hover:text-red-600 transition-colors cursor-pointer justify-self-center p-1.5 rounded hover:bg-red-50"
                title="Delete Product"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}

        {list.length === 0 && !loading && (
          <div className="py-16 text-center text-gray-400">
            No products found in the database.
          </div>
        )}
      </div>
    </div>
  );
};

export default List;