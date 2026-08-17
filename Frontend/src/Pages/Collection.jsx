import React, { useEffect, useState } from "react";
import { assets, products } from "../assets/frontend_assets/assets.js";
import Title from "../Components/Title.jsx";
import Product from "../Components/Product.jsx";

function Collection() {
  let [open, setOpen] = useState(false);
  let [filterProducts, setFilterProducts] = useState(products);
  let [Categorie, setCategorie] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    applyFilters();
  }, [Categorie, subCategory, sortType]);

  function applyFilters() {
    let productsCopy = products.slice();

    if (Categorie.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Categorie.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    if (sortType === "high-to-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    } else if (sortType === "low-to-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    }

    setFilterProducts(productsCopy);
  }

  function toggleCategory(e) {
    if (Categorie.includes(e.target.value)) {
      setCategorie((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategorie((prev) => [...prev, e.target.value]);
    }
  }

  function toggleSubCategory(e) {
    const { value } = e.target;

    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  }

  return (
    <div className="relative px-4 mt-10 flex flex-col sm:flex-row">
      <div className="left mb-10 sm:mb-0 bg-white z-50 sticky top-0 sm:top-2 left-10 w-full sm:w-1/6">
        <span className="flex flex-row gap-2 items-center">
          <h1
            onClick={() => setOpen((prev) => !prev)}
            className="text-xl cursor-pointer font-medium"
          >
            Filter
          </h1>
          <img
            onClick={() => setOpen((prev) => !prev)}
            src={assets.dropdown_icon}
            alt=""
            className={`w-4 sm:hidden ${open && "rotate-90"} h-4 cursor-pointer object-cover`}
          />
        </span>
        <section
          className={`${open ? "flex gap-2" : "hidden"}  sm:flex sm:flex-col`}
        >
          <div className="flex w-full flex-col mt-5 gap-1 border border-gray-400 p-4">
            <p className="font-medium mb-2">Categories</p>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value="Men"
                id="men"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="men"
              >
                Men
              </label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value="Women"
                id="women"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="women"
              >
                Women
              </label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value="Kids"
                id="Other"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="Other"
              >
                Kids
              </label>
            </div>
          </div>
          <div className="flex w-full flex-col mt-5 gap-1 border border-gray-400 p-4">
            <p className="font-medium mb-2">Type</p>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value="Topwear"
                id="TopWear"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="TopWear"
              >
                Topwear
              </label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value="Bottomwear"
                id="Bottomwear"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="Bottomwear"
              >
                Bottomwear
              </label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value="Winterwear"
                id="WinterWear"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="WinterWear"
              >
                Winterwear
              </label>
            </div>
          </div>
        </section>
      </div>

      <div className="right w-full md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between items-start justify-between gap-3">
          <Title title1="All" title2="Collection" />
          <select
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
            className="cursor-pointer border border-gray-600 outline-none p-1 rounded-md"
            name="selection"
            id="select"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="high-to-low">Sort by: High to Low</option>
            <option value="low-to-high">Sort by: Low to High</option>
          </select>
        </div>
        <div className="products mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filterProducts.map((item) => (
            <Product
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
