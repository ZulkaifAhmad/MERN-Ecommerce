import Order from "../Schema/order.schema.js";
import User from "../Schema/auth.schema.js";

// Place Order using Cash on Delivery (COD)
async function placeOrder(req, res) {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || items.length === 0 || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Order items, amount, and delivery address are required",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear user cart upon successful order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing COD order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  }
}

// Place Order using Stripe
async function placeOrderStripe(req, res) {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || items.length === 0 || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Order items, amount, and delivery address are required",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: true,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Stripe payment processed and order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing Stripe order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process Stripe order",
    });
  }
}

// Place Order using Razorpay
async function placeOrderRazorpay(req, res) {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || items.length === 0 || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Order items, amount, and delivery address are required",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: true,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Razorpay payment processed and order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process Razorpay order",
    });
  }
}

// Fetch all orders placed by the logged-in user
async function userOrders(req, res) {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
}

// Fetch all orders for Admin panel
async function allOrders(req, res) {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching all orders for admin:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders list",
    });
  }
}

// Update order status (Admin)
async function updateStatus(req, res) {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update order status",
    });
  }
}

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
};
