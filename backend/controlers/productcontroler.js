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
const updatebyid = async (req, res) => {
  try {
    let find = await products.findById(req.params.id);
    if (!find) {
      throw new Error("could not find the product");
    }
    find.name = req.body.name;
    find.price = req.body.price;
    find.category = req.body.category;
    find.description = req.body.description;
    find.countInStock = req.body.countInStock;
    find.brand = req.body.brand;
    await find.save();
    res.status(201).json(find);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
const AddReview = async (req, res) => {
  try {
    let find = await products.findById(req.params.id);
    const { rating, comment } = req.body;
    if (!find) throw new Error("there is no product ");
    /*const finder = find.reviews.find(
      (item) => item.user.toString() === req.user._id.toString()
    );
    if (finder) {
      throw new Error("You have already reviewd ");
    }*/
    const review = {
      user: req.user._id,
      name: req.user.name,
      comment,
      rating: Number(rating),
    };
    find.reviews.push(review);
    find.numReviews = find.reviews.length;
    find.rating =
      find.reviews.reduce((acc, a) => acc + a.rating, 0) / find.reviews.length;
    await find.save();
    res.status(201).json(find);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
export { getById, getall, deleter, AddProduct, updatebyid, AddReview };
