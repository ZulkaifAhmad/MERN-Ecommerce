import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { myContext } from "../Context/ShopContext.jsx";

function Navbar() {
  const pages = [
    { path: "/", route: "Home", id: "19a" },
    { path: "/collection", route: "Collection", id: "19c" },
    { path: "/about", route: "About", id: "19b" },
    { path: "/contact", route: "Contact", id: "19d" },
  ];

  const navigate = useNavigate();
  const {
    setShowCollectionSearch,
    setCollectionSearch,
    getCartCount,
    token,
    logout,
    userData,
  } = useContext(myContext);

  const cartItemCount = getCartCount();
  let [visual, setVisual] = useState(false);

  const handleSearchClick = () => {
    setCollectionSearch("");
    setShowCollectionSearch(true);
    navigate("/collection");
  };

  return (
    <nav className="px-4 sm:px-6 md:px-0 py-3 sm:py-4 md:py-7 flex justify-between items-center">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32 md:w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-gray-100 text-sm">
        {pages.map((page) => (
          <NavLink
            key={page.id}
            to={page.path}
            className={({ isActive }) =>
              `relative text-sm font-medium uppercase ${
                isActive
                  ? "text-black after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[2px] after:bg-gray-600"
                  : "text-gray-500"
              }`
            }
          >
            {page.route}
          </NavLink>
        ))}
      </ul>

      <div className="flex gap-3 sm:gap-5 items-center">
        <img
          src={assets.search_icon}
          onClick={handleSearchClick}
          className="w-4 cursor-pointer"
          alt="search"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-4 cursor-pointer"
            alt="profile"
          />

          {token && (
            <div className="group-hover:block dropdown-menu absolute right-0 pt-2 hidden z-10">
              <div className="flex flex-col gap-2 mt-1 bg-white border border-gray-100 min-w-36 rounded p-4 shadow-md text-sm">
                <p className="font-semibold text-gray-800 border-b border-gray-100 pb-1.5 truncate">
                  {userData?.username || "My Account"}
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer capitalize hover:text-black text-gray-600 whitespace-nowrap"
                >
                  My Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer capitalize hover:text-red-500 text-gray-600 whitespace-nowrap pt-1 border-t border-gray-100"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-4 cursor-pointer"
            alt="cart"
          />
          <p className="absolute -bottom-1 -right-1 w-3.5 h-3.5 flex items-center justify-center text-[9px] rounded-full bg-black text-white">
            {cartItemCount}
          </p>
        </Link>

        <img
          onClick={() => setVisual((prev) => !prev)}
          src={assets.menu_icon}
          className="w-4 sm:hidden cursor-pointer ml-1"
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`sidebar p-5 sm:p-6 transition-all duration-300 overflow-hidden bg-white shadow-xl fixed sm:absolute top-0 right-0 z-50 ${
          visual ? "w-full h-full" : "w-0 hidden h-0"
        }`}
      >
        <div className="back flex items-center gap-2">
          <img
            src={assets.dropdown_icon}
            onClick={() => setVisual((prev) => !prev)}
            className="w-5 h-5 rotate-180 object-cover cursor-pointer"
            alt="back"
          />
          <p className="text-lg sm:text-xl text-gray-700">Back</p>
        </div>
        <div className="navlinks flex flex-col gap-5 sm:gap-4 mt-8">
          {pages.map((page) => (
            <NavLink
              key={page.id}
              to={page.path}
              onClick={() => setVisual((prev) => !prev)}
              className={({ isActive }) =>
                `relative text-lg font-medium uppercase ${
                  isActive ? "underline" : "text-gray-500"
                }`
              }
            >
              {page.route}
            </NavLink>
          ))}
          {token ? (
            <>
              <p
                onClick={() => {
                  setVisual(false);
                  navigate("/orders");
                }}
                className="text-lg font-medium uppercase text-gray-500 cursor-pointer"
              >
                Orders
              </p>
              <p
                onClick={() => {
                  setVisual(false);
                  logout();
                }}
                className="text-lg font-medium uppercase text-red-500 cursor-pointer"
              >
                Logout
              </p>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setVisual((prev) => !prev)}
              className="text-lg font-medium uppercase text-gray-500"
            >
              Login / Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
