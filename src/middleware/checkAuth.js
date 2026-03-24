import User from "../model/user.model.js";

export const checkAuth = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    data: user
  });
};