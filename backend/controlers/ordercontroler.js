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
    let find = await Order.findById(req.params.id);
    if (find) {
      find.isPaid = true;
      find.paidAt = Date.now();
      find.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
    }
    const updated = await find.save();
    res.status(201).json(updated);
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};
const updateOrderToDelivered = async (req, res) => {
  try {
    let find = await Order.findById(req.params.id);
    if (!find) {
      throw new Error("the id is not right");
    }
    find.isDelivered = true;
    find.deliveredAt = Date.now();
    const updated = await find.save();
    res.status(201).json(updated);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const all = await Order.find({}).populate("user", "id name");
    res.status(201).json(all);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

////

export {
  addOrder,
  getOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
