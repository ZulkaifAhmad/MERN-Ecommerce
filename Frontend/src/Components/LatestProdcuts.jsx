import React, { useContext } from "react";
import { myContext } from "../Context/ShopContext.jsx";
import Title from "./Title.jsx";
import Product from "./Product.jsx";

function LatestProdcuts() {
  let { products } = useContext(myContext);
  let latestProduct = products.slice(0, 10);
  return (
    <div className="relative mt-15">
      <div className="text-center py-8 text-3xl mt-5 sm:mt-3 mb-7">
        <Title title1={"Latest"} title2={"Collection"} />
        <p className="text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          quae obcaecati doloremque cum corporis consequatur.
        </p>
      </div>

      {/* Rendering Prodcuts */}
      <div className="products grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
        {latestProduct.map((item) => (
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
  );
}

export default LatestProdcuts;
