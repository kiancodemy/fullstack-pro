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
      message: `You faced Error it is ${err}`,
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
      message: `the error is ${err}`,
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
export { getById, getall, deleter };
