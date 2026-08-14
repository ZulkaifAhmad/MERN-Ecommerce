import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { NavLink } from "react-router-dom";

function Navbar() {
  const pages = [
    { path: "/", route: "Home", id: "19a" },
    { path: "/about", route: "About", id: "19b" },
    { path: "/collection", route: "Collection", id: "19c" },
    { path: "/contact", route: "Contact", id: "19d" },
    { path: "/cart", route: "Cart", id: "19e" },
  ];

  return (
    <nav className="py-4 md:py-7 flex justify-between items-center">
      <img src={assets.logo} alt="logo" className="w-36" />

      <ul className="hidden sm:flex gap-5 text-gray-700 text-sm">
        {pages.map((page) => (
          <NavLink
            key={page.id}
            to={page.path}
            className={({ isActive }) =>
              isActive ? "text-black underline" : ""
            }
          >
            {page.route}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;