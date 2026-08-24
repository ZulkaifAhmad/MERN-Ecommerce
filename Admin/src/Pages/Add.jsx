import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";

const Add = ({ token, backendUrl }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (!images[0] && !images[1] && !images[2] && !images[3]) {
      toast.error("Please upload at least one product image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      if (images[0]) formData.append("image1", images[0]);
      if (images[1]) formData.append("image2", images[1]);
      if (images[2]) formData.append("image3", images[2]);
      if (images[3]) formData.append("image4", images[3]);

      const response = await fetch(`${backendUrl}/api/products/create-product`, {
        method: "POST",
        headers: {
          token: token,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImages([null, null, null, null]);
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Network error while adding product");
    } finally {
      setLoading(false);
    }
  };

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  return (
    <form onSubmit={onSubmitHandler} className="flex pb-10 flex-col gap-4 max-w-xl text-sm">
      <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>

      {/* Upload Image */}
      <div>
        <p className="mb-1.5 text-gray-700 font-medium">Upload Images</p>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image-${index}`}
              className="w-16 h-16 sm:w-20 sm:h-20 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden rounded"
            >
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt={`upload-${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <UploadCloud size={16} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    Upload
                  </span>
                </>
              )}
              <input
                type="file"
                id={`image-${index}`}
                accept="image/*"
                hidden
                onChange={(e) =>
                  handleImageChange(index, e.target.files[0])
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product name */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-700 font-medium">Product name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Cotton Casual Shirt"
          required
          className="w-full max-w-sm px-3 py-2 border border-gray-300 outline-none focus:border-slate-800 text-sm rounded"
        />
      </div>

      {/* Product description */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-700 font-medium">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write product details, fabric, fit, etc."
          rows={3}
          required
          className="w-full max-w-sm px-3 py-2 border border-gray-300 outline-none focus:border-slate-800 text-sm resize-y rounded"
        />
      </div>

      {/* Category / Sub category / Price */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Product category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-32 px-2.5 py-2 border border-gray-300 outline-none text-sm bg-white rounded cursor-pointer"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full sm:w-32 px-2.5 py-2 border border-gray-300 outline-none text-sm bg-white rounded cursor-pointer"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Product Price ($)</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            min="1"
            required
            className="w-full sm:w-28 px-3 py-2 border border-gray-300 outline-none focus:border-slate-800 text-sm rounded"
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div className="flex flex-col gap-1.5">
        <p className="text-gray-700 font-medium">Product Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {sizeOptions.map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 cursor-pointer text-sm select-none transition-colors rounded ${
                sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-slate-100 text-gray-700 hover:bg-slate-200"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller checkbox */}
      <div className="flex items-center gap-2 mt-1">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="w-4 h-4 accent-slate-800 cursor-pointer"
        />
        <label
          htmlFor="bestseller"
          className="text-gray-700 cursor-pointer select-none text-sm font-medium"
        >
          Add to bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-36 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors font-medium tracking-wide text-sm rounded cursor-pointer disabled:opacity-50 mt-2"
      >
        {loading ? "UPLOADING..." : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default Add;