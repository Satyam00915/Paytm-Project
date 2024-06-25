const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const response = jwt.verify(token, JWT_SECRET);
    req.userId = response.userId;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Token Invalid",
    });
  }
}

module.exports = {
  authMiddleware,
};
