const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (data) => {
    return new Promise((resolve, reject) => {
      const payload = data;
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          // console.log(err.message)
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    console.log(req.headers);
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      const token = await module.exports.signAccessToken({
        user_id: payload.user_id,
        user_name: payload.user_name,
        user_position: payload.user_position,
        user_fullname: payload.user_fullname,
        user_profession: payload.user_profession,
        user_email: payload.user_email,
      });
      console.log(payload);
      req.payload = payload;
      req.token = token;
      next();
    });
  },
};
