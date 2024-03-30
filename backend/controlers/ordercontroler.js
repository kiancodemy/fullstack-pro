import Order from "../models/ordermodel.js";
const addOrder = async (req, res) => {
  try {
    const {
      cartItems,
      shippingAddress,
      paymentmethod,
      itemPrice,
      totalPrice,
      shippingPrice,
      taxPrice,
    } = req.body;
    if (cartItems && cartItems.length === 0) {
      throw new Error("There is no order");
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems: cartItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        shippingAddress,
        paymentmethod,
        itemPrice,
        totalPrice,
        shippingPrice,
        taxPrice,
      });
      const all = await order.save();
      res.status(201).json(all);
    }
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};

/////get orders
const getOrder = async (req, res) => {
  try {
    const get = await Order.find({ user: req.user._id });
    res.status(201).json(get);
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};
/////get orders by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.status(201).json(order);
    } else {
      throw new Error("Invalid Id");
    }
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};
const updateOrderToPaid = async (req, res) => {
  try {
    res.send(" updateOrderToPaid ");
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};
const updateOrderToDelivered = async (req, res) => {
  try {
    res.send(" updateOrderToDelivered");
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    res.send(" getAllOrders");
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
};
export {
  addOrder,
  getOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
