const jwt = require("jsonwebtoken");

//4 responsibilities of a middleware function
//* can execute any code
//* can modify req, res object
//* can end req, res cycle
//* call the next middleware function

module.exports.authenticateUser = async (
  req,
  res,
  next
) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    let tokenData;
    try {
      tokenData = await jwt.verify(
        token,
        "secret123"
      );
      req.decoded = tokenData;
      next();
    } catch (err) {
      res
        .status("401")
        .json({ error: err.message });
    }
  } else {
    res
      .status("401")
      .json({ error: "token not provided" });
  }
};
