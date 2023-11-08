import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("hit");
      return res.status(401).json({ message: "bad validation" });
    }

    req.body.userId = decoded.userId;
    return next();
  });
};

export default authenticateUser;
