import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { myContext } from '../Context/ShopContext.jsx'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Products() {
  const { slug } = useParams()
  const { products, currency, delevery_charges, addToCart } = useContext(myContext)

  const [productData, setProductData] = useState(null)
  const [mainImage, setMainImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const found = products.find((item) => item._id === slug)
    if (found) {
      setProductData(found)
      setMainImage(found.image[0])
      setSelectedSize('')
    }
  }, [slug])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.')
      return
    }

    addToCart(productData._id, selectedSize)
    toast.success(`${productData.name} added to cart.`)
  }

  if (!productData) {
    return <div className="px-4 sm:px-10 py-16 text-center text-gray-500 text-sm">Loading...</div>
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item._id !== productData._id &&
        item.category === productData.category &&
        item.subCategory === productData.subCategory
    )
    .slice(0, 5)

  return (
    <div className="px-4 sm:px-10 pt-5 sm:pt-8 border-t border-t-gray-300">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row max-w-2xl">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-16">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-14 sm:w-full flex-shrink-0 cursor-pointer bg-[#f2f2f2] object-cover ${
                  mainImage === img ? 'ring-1 ring-black' : ''
                }`}
                alt={`${productData.name} thumbnail ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex-1 bg-[#f2f2f2] max-w-sm">
            <img
              src={mainImage}
              className="w-full h-full object-cover"
              alt={productData.name}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-medium mt-1">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < 4 ? 'text-orange-500' : 'text-orange-200'}`}>
                ★
              </span>
            ))}
            <p className="text-gray-500 text-xs pl-1">(122)</p>
          </div>

          <p className="text-xl font-semibold mt-3">{currency}{productData.price}</p>

          <p className="text-gray-500 text-xs mt-3 max-w-md leading-relaxed">
            {productData.description}
          </p>

          <div className="mt-5">
            <p className="text-sm font-medium">Select Size</p>
            <div className="flex gap-1.5 mt-1.5 flex-wrap">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-9 h-8 px-2 border text-xs ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 bg-[#fafafa] text-gray-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} className="bg-black text-white text-xs px-6 py-2.5 mt-5 tracking-wide active:scale-95 transition">
            ADD TO CART
          </button>

          <hr className="mt-5 sm:w-4/5 border-gray-200" />

          <div className="text-xs text-gray-500 mt-3 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Delivery charge: {currency}{delevery_charges}</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-4 py-2 text-xs border ${
              activeTab === 'description'
                ? 'font-bold border-gray-800'
                : 'text-gray-500 border-gray-200'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs border ${
              activeTab === 'reviews'
                ? 'font-bold border-gray-800'
                : 'text-gray-500 border-gray-200'
            }`}
          >
            Reviews (122)
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className="flex flex-col gap-3 border px-5 py-5 text-xs text-gray-500 leading-relaxed">
            <p>
              An e-commerce website is an online platform that facilitates the buying and
              selling of products or services over the internet. It serves as a virtual
              marketplace where businesses and individuals can showcase their products,
              interact with customers, and conduct transactions without the need for a
              physical presence. E-commerce websites have gained immense popularity due to
              their convenience, accessibility, and the global reach they offer.
            </p>
            <p>
              E-commerce websites typically display products or services along with detailed
              descriptions, images, prices, and any available variations (e.g., sizes,
              colors). Each product usually has its own dedicated page with relevant
              information.
            </p>
          </div>
        ) : (
          <div className="border px-5 py-5 text-xs text-gray-500">
            No reviews yet. Be the first to review this product.
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="my-16">
          <h2 className="text-center text-lg">
            RELATED <span className="font-bold">PRODUCTS</span>
          </h2>
          <div className="flex items-center justify-center mt-1.5 mb-6">
            <div className="w-10 h-[2px] bg-gray-800" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className="group">
                <div className="overflow-hidden bg-[#f2f2f2]">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-xs mt-2 leading-snug">{item.name}</p>
                <p className="text-xs font-medium mt-0.5">{currency}{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
