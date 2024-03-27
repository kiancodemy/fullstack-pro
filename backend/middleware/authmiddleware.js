import Jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (!token) {
      throw new Error("there is  no token please login");
    }
    const decoded = Jwt.verify(token, process.env.SECRETPASS);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};
///admin
export const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    }

    throw new Error("you are not admin");
  } catch (err) {
    res.status(404).json({
      message: `${err.message}`,
    });
  }
};