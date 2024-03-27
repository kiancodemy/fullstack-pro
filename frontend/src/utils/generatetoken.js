import jtw from "jsonwebtoken";
const jwtmaker = (id) => {
  return jtw.sign({ id: id }, process.env.SECRETPASS, {
    expiresIn: "2d",
  });
};

export const tokenGenerator = (res, myuser) => {
  const token = jwtmaker(myuser._id);
  const cookie = res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json({
    _id: myuser._id,
    name: myuser.name,
    email: myuser.email,
    admin: myuser.isAdmin,
  });
};
