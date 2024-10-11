const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.email = payload.email;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

module.exports = {
  verifyToken,
};
