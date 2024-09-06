const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/config");
const { ClassUsers } = require("../controllers/Users/Users.controller");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) throw new Error("Token not send");
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('error :>> ', error);
  }
};

const apikey = async (req, res, next) => {
  try {
    const apikeyencoded = req.header("apikey");
    if (apikey == null) throw Error();
    next();
  } catch (error) {
    next(Boom.unauthorized(error));
  }
};

const isUser = async (req, res, next) => {
  try {
    const user = await ClassUsers.getByToken(req.header("token"));
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "No Authorized",
    });
  }
};

module.exports = {
    verifyToken,
    apikey,
    isUser
}