import { useState } from "react";
import { UploadCloud } from "lucide-react";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [sizes, setSizes] = useState([]);

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

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  return (
    <form className="flex pb-10 flex-col gap-4 max-w-xl text-sm">
      {/* Upload Image */}
      <div>
        <p className="mb-1.5 text-gray-700 font-medium">Upload Image</p>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image-${index}`}
              className="w-16 h-16 sm:w-20 sm:h-20 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden"
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
          placeholder="Type here"
          className="w-full max-w-sm px-2.5 py-1.5 border border-gray-300 outline-none focus:border-gray-500 text-sm"
        />
      </div>

      {/* Product description */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-700 font-medium">Product description</p>
        <textarea
          placeholder="Write content here"
          rows={3}
          className="w-full max-w-sm px-2.5 py-1.5 border border-gray-300 outline-none focus:border-gray-500 text-sm resize-y"
        />
      </div>

      {/* Category / Sub category / Price */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Product category</p>
          <select className="w-full sm:w-32 px-2.5 py-1.5 border border-gray-300 outline-none text-sm bg-white">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Sub category</p>
          <select className="w-full sm:w-32 px-2.5 py-1.5 border border-gray-300 outline-none text-sm bg-white">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Product Price</p>
          <input
            type="number"
            placeholder="25"
            className="w-full sm:w-24 px-2.5 py-1.5 border border-gray-300 outline-none focus:border-gray-500 text-sm"
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
              className={`px-3 py-1.5 cursor-pointer text-sm select-none transition-colors ${
                sizes.includes(size)
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-gray-700 hover:bg-slate-200"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          className="w-3.5 h-3.5 accent-slate-800 cursor-pointer"
        />
        <label
          htmlFor="bestseller"
          className="text-gray-700 cursor-pointer select-none text-sm"
        >
          Add to bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-28 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-medium tracking-wide text-sm"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;