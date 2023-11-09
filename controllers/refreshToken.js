import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const REFRESH_TOKEN = async (req, res) => {
  const refreshToken = req.headers.authorization;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // patikrina ar user su decoded userId yra
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // sugeneruojam nauja jwt
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

export { REFRESH_TOKEN };
