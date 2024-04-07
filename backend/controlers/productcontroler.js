import products from "../models/productmodel.js";
const getall = async (req, res) => {
  try {
    let query = products.find();
    query.maxTimeMS(15000);
    const all = await query;
    if (!all) {
      throw new Error("noting has found at all");
    }
    res.json(all);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const params = req.params.id;
    const finder = await products.findById(params);
    if (!finder) {
      throw new Error("noting has found by this id");
    }
    res.json(finder);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const deleter = async (req, res) => {
  try {
    const deleter = await products.findByIdAndDelete(req.params.id);
    await res.status(201).json(deleter);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const AddProduct = async (req, res) => {
  try {
    const add = new products({
      user: req.user._id,
      name: "sample",
      image: "/images/sample.jpg",
      brand: "sample brand",
      category: "sample",
      description: "sample",

      numReviews: 0,
      price: 0,
      countInStock: 0,
    });
    const product = await add.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
export { getById, getall, deleter, AddProduct };
