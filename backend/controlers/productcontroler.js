import products from "../models/productmodel.js";
const getall = async (req, res) => {
  try {
    const all = await products.find();
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
export { getById, getall };
