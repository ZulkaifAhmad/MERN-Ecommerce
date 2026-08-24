import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import Title from "../Components/Title.jsx";
import Product from "../Components/Product.jsx";
import { myContext } from "../Context/ShopContext.jsx";

function Collection() {
  const { products, showCollectionSearch, collectionSearch, setCollectionSearch } =
    useContext(myContext);

  const [open, setOpen] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Categorie, setCategorie] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [searchValue, setSearchValue] = useState(collectionSearch);

  useEffect(() => {
    setSearchValue(collectionSearch);
  }, [collectionSearch]);

  useEffect(() => {
    applyFilters();
  }, [products, Categorie, subCategory, sortType, collectionSearch]);

  function applyFilters() {
    let productsCopy = products ? products.slice() : [];

    if (collectionSearch.trim()) {
      const searchQuery = collectionSearch.trim().toLowerCase();
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }

    if (Categorie.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Categorie.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
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
        : [...prev, value]
    );
  }

  const handleSearchSubmit = () => {
    setCollectionSearch(searchValue.trim());
  };

  return (
    <div className="relative px-4 mt-10 flex flex-col sm:flex-row">
      <div className="left mb-10 sm:mb-0 bg-white z-20 sticky top-0 sm:top-2 left-10 w-full sm:w-1/6">
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
          className={`${open ? "flex gap-2" : "hidden"} sm:flex sm:flex-col`}
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
                id="Kids"
              />
              <label
                className="text-sm cursor-pointer text-gray-700"
                htmlFor="Kids"
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
            className="cursor-pointer text-gray-600 border border-gray-600 outline-none p-1"
            name="selection"
            id="select"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="high-to-low">Sort by: High to Low</option>
            <option value="low-to-high">Sort by: Low to High</option>
          </select>
        </div>

        {showCollectionSearch && (
          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" && handleSearchSubmit()
              }
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="px-4 py-2 rounded-md bg-black text-white font-medium whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </div>
        )}

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

        {filterProducts.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            No products found matching the criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
