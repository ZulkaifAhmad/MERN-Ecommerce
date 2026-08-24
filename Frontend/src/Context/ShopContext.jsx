import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const myContext = createContext();

function ShopContextProvider({ children }) {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const currency = "$";
  const delevery_charges = 10;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );

  const [showCollectionSearch, setShowCollectionSearch] = useState(false);
  const [collectionSearch, setCollectionSearch] = useState("");

  // Fetch all products from Backend API
  const getProductsData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/products/getall-products`);
      const data = await response.json();
      if (data.success || data.products) {
        setProducts(data.products || []);
      } else {
        toast.error(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Could not connect to backend server");
    }
  };

  // Fetch user cart from Backend API
  const getUserCart = async (userToken) => {
    try {
      const response = await fetch(`${backendUrl}/api/cart/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: userToken,
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (data.success && data.cartData) {
        setCartItems(data.cartData);
      }
    } catch (error) {
      console.error("Error loading user cart:", error);
    }
  };

  // Add to cart with live backend sync
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a product size");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await fetch(`${backendUrl}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId, size }),
        });
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message || "Failed to sync cart");
        }
      } catch (error) {
        console.error("Error syncing cart item:", error);
        toast.error("Network error while updating cart");
      }
    }
  };

  // Update quantity in cart with live backend sync
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await fetch(`${backendUrl}/api/cart/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId, size, quantity }),
        });
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message || "Failed to update quantity");
        }
      } catch (error) {
        console.error("Error syncing quantity:", error);
      }
    }
  };

  // Calculate total count of items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return totalCount;
  };

  // Calculate subtotal amount for cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return totalAmount;
  };

  // Logout helper
  const logout = async () => {
    try {
      if (token) {
        await fetch(`${backendUrl}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken("");
    setUserData(null);
    setCartItems({});
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delevery_charges,
    showCollectionSearch,
    setShowCollectionSearch,
    collectionSearch,
    setCollectionSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    token,
    setToken,
    userData,
    setUserData,
    backendUrl,
    getProductsData,
    logout,
    navigate,
  };

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
}

export default ShopContextProvider;
