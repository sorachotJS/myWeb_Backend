const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
  try {
    //code
    // const token = req.headers["authorization"]
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send('No token')
    } else {
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = decoded.user

    }

    next();
  } catch (err) {
    // err
    console.log(err)
    res.send('Token Invalid').status(500)
  }
}