import React, { useContext, useEffect } from "react";
import { myContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";


function Product({ id, name, price, image }) {
  const { currency } = useContext(myContext);
  return (
    <Link to={`/product/${id}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="overflow-hidden bg-gray-100 aspect-[3/4]">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="pt-3">
          <p className="text-sm text-gray-700 truncate">{name}</p>
          <p className="text-sm font-semibold text-gray-900 mt-1">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Product;
