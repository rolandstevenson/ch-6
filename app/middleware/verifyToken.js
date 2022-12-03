const { User } = require("../models");
const jwt = require("jsonwebtoken");

verifyToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findByPk(tokenPayload.id);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
